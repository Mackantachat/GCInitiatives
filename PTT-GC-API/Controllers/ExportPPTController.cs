using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data;
using PTT_GC_API.Data.Interface;
using System.IO;
using System.Drawing;
using Spire.Presentation;
using Spire.Presentation.Drawing;
using Spire.Presentation.Collections;
using Microsoft.Extensions.Hosting;
using Microsoft.CodeAnalysis.VisualBasic.Syntax;
using System.Data;
using DocumentFormat.OpenXml.Presentation;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Validation;

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExportPPTController : ControllerBase
    {
        private readonly StoreProcedureInterface _storeProcedure;
        private readonly IHostEnvironment _hostingEnvironment;
        private readonly DataContext _context;
        static uint uniqueId;

        public ExportPPTController(StoreProcedureInterface storeProcedure, IHostEnvironment hostingEnvironment)
        {
            _storeProcedure = storeProcedure;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet("GeneratePowerpoint")]
        public async Task<ActionResult> GeneratePowerpoint([FromQuery]string storeName, [FromQuery] string param, [FromQuery] int reportID)
        {
            //ComponentInfo.SetLicense("FREE-LIMITED-KEY");

            //var presentation = new PresentationDocument();

            //var slide = presentation.Slides.AddNew(SlideLayoutType.Custom);
            //presentation.Slides.AddNew(SlideLayoutType.Custom);
            //presentation.Slides.AddNew(SlideLayoutType.Custom);
            //presentation.Slides.AddNew(SlideLayoutType.Custom);
            //presentation.Slides.AddNew(SlideLayoutType.Custom);
            //presentation.Slides.AddNew(SlideLayoutType.Custom);

            //var textBox = slide.Content.AddTextBox(ShapeGeometryType.Rectangle, 2, 2, 5, 4, LengthUnit.Centimeter);

            //var paragraph = textBox.AddParagraph();

            //paragraph.AddRun("Hello World!");

            //presentation.Save("Hello World.pptx");

            //var memstream = new MemoryStream();
            //presentation.Save(memstream, SaveOptions.Pptx);



            //query data from stored

            //-----------------------------

            string year = "2021";
            DataTable dataTable = await GetDataMock();
            string[] strategies = dataTable.AsEnumerable().Select(i => (string)i[0]).Distinct().ToArray();

            var memstream = new MemoryStream();
            List<Spire.Presentation.Presentation> presentations = new List<Spire.Presentation.Presentation>();
            //create PPT document
            AddPresenttation(ref presentations);
            Spire.Presentation.Presentation presentation = presentations.FirstOrDefault();

            SetSlideOrentation(ref presentation);
            SetMasterSlideCIMReport(ref presentation);

            double widthForTable = 40;
            double heightForTable = 100;

            double width_SizeTable = presentation.SlideSize.Size.Width - 80;
            double height_SizeTable = presentation.SlideSize.Size.Height - 150;

            //add new table to PPT
            Double[] widths = GetColumnsTable(width_SizeTable, 1);
            Double[] heights = new double[] { 1 };
            ITable table = presentation.Slides[0].Shapes.AppendTable((float)widthForTable, (float)heightForTable, widths, heights);
            table.StylePreset = TableStylePreset.None;
            table.SetTableBorder(TableBorderType.All, 1, Color.Black);
            AppendTableRow(ref table); //append row 2 for header
            AppendTableRow(ref table); // append row 3 for data details and for copy row
            SetFontTable(ref table);
            SetHeaderTable(ref table, 1, year);
            SetReportName(ref presentation);
            SetHeaderYear(ref presentation, year);
            SetExportDate(ref presentation);


            int idxStartRowDetail = 2;
            for (int i = 0; i < strategies.Length; i++) // start from row 3
            {
                if (idxStartRowDetail + i > 2)
                {
                    AppendTableDetailRow(ref table);
                }

                table[0, idxStartRowDetail + i].TextFrame.Paragraphs[0].TextRanges[0].Text = strategies[i];

                EnumerableRowCollection<DataRow> nowStrategyRows = dataTable.AsEnumerable().Where(myRow => myRow[0].ToString().Trim() == strategies[i].Trim());

                if (!nowStrategyRows.Any())
                    continue;

                DataTable nowStrategyTable = nowStrategyRows.CopyToDataTable();


                foreach (DataRow dr in nowStrategyTable.Rows)
                {
                    //column 1
                    //table[1, idxStartRowDetail + i].TextFrame.Paragraphs[0].TextRanges[0].Text = (string)dr[1]; // name    


                    TextRange textRange = new TextRange("");
                    if (table[1, idxStartRowDetail + i].TextFrame.Paragraphs[0].TextRanges.Count > 1)
                    {
                        textRange.Text = "\n";
                    }

                    textRange.Text += (string)dr[1];
                    textRange.LatinFont = new TextFont("Tahoma");
                    textRange.FontHeight = 7;
                    textRange.Format.Fill.FillType = FillFormatType.Solid;
                    textRange.Format.Fill.SolidColor.Color = GetColorFromEntryModeTitle((string)dr[2]);
                    table[1, idxStartRowDetail + i].TextFrame.Paragraphs[0].TextRanges.Append(textRange);
                }
            }
            AppendTableDetailRow(ref table);
            table[0, table.TableRows.Count - 1].TextFrame.Paragraphs[0].TextRanges[0].Text = "No. of Total Project";
            table[1, table.TableRows.Count - 1].TextFrame.Paragraphs[0].TextRanges[0].Text = dataTable.Rows.Count.ToString();

            //check table over slide  need to split to next slide
            RecursiveCheckTableRowAndSplitTableToNewSlide(height_SizeTable, ref presentations);


            if (presentations.Count > 1)
            {
                await (await MergeSlides(presentations)).CopyToAsync(memstream);
            }
            else
            {
                if (presentations.FirstOrDefault() != null)
                {
                    presentations.FirstOrDefault().SaveToFile(memstream, FileFormat.Pptx2013);
                }
            }
            return File(new MemoryStream(memstream.ToArray()), "application/vnd.openxmlformats", "test.pptx"); ;
        }

        public void AddPresenttation(ref List<Spire.Presentation.Presentation> presentations)
        {
            presentations.Add(new Spire.Presentation.Presentation());
        }

        public void AppendTableRow(ref ITable table)
        {
            TableRow tableRow = table.TableRows[0]; //duplicate from row 0

            foreach (Cell cell in tableRow)
            {
                cell.TextFrame.Text = "";
            }

            table.TableRows.Append(tableRow);
        }

        public void AppendTableDetailRow(ref ITable table)
        {
            if (table.TableRows.Count < 3)
                return;

            TableRow tableRow = table.TableRows[2]; //duplicate from row 3
            table.TableRows.Append(tableRow);
            tableRow = table.TableRows[table.TableRows.Count - 1]; //clear now row value
            foreach (Cell cell in tableRow)
            {
                cell.TextFrame.Text = "";
            }

        }

        public void SetMasterSlideCIMReport(ref Spire.Presentation.Presentation presentation)
        {
            IMasterSlide master = presentation.Masters[0];
            //add top left
            String image = _hostingEnvironment.ContentRootPath + @"/PowerpointTemplate/TopLeft.png";
            RectangleF rff = new RectangleF(0, 0, (float)100, (float)90);
            IEmbedImage pic = master.Shapes.AppendEmbedImage(ShapeType.Rectangle, image, rff);
            pic.Line.FillFormat.FillType = FillFormatType.None;

            //add bottom right logo gc
            image = _hostingEnvironment.ContentRootPath + @"/PowerpointTemplate/BottomRight.png";
            rff = new RectangleF(presentation.SlideSize.Size.Width - 95, presentation.SlideSize.Size.Height - 41, (float)90, (float)36);
            pic = master.Shapes.AppendEmbedImage(ShapeType.Rectangle, image, rff);
            pic.Line.FillFormat.FillType = FillFormatType.None;
        }

        public void SetSlideOrentation(ref Spire.Presentation.Presentation presentation)
        {
            presentation.SlideSize.Orientation = SlideOrienation.Landscape;
            presentation.SlideSize.Type = SlideSizeType.Screen16x9;
        }

        public void SetFontTable(ref ITable table)
        {
            if (table.TableRows[0] != null)
            {
                TableRow tableRow = table.TableRows[0];

                foreach (Cell cell in tableRow)
                {
                    cell.TextFrame.Paragraphs[0].TextRanges[0].LatinFont = new TextFont("Tahoma");
                    cell.TextFrame.Paragraphs[0].TextRanges[0].FontHeight = 7;
                    cell.TextFrame.Paragraphs[0].TextRanges[0].IsBold = TriState.True;
                    cell.TextFrame.Paragraphs[0].TextRanges[0].Format.Fill.FillType = FillFormatType.Solid;
                    cell.TextFrame.Paragraphs[0].TextRanges[0].Format.Fill.SolidColor.Color = Color.White;
                    cell.FillFormat.FillType = FillFormatType.Solid;
                    cell.FillFormat.SolidColor.Color = Color.Gray;
                }
            }

            if (table.TableRows[1] != null)
            {
                TableRow tableRow = table.TableRows[1];

                foreach (Cell cell in tableRow)
                {
                    cell.TextFrame.Paragraphs[0].TextRanges[0].LatinFont = new TextFont("Tahoma");
                    cell.TextFrame.Paragraphs[0].TextRanges[0].FontHeight = 7;
                    cell.TextFrame.Paragraphs[0].TextRanges[0].IsBold = TriState.True;
                    cell.TextFrame.Paragraphs[0].TextRanges[0].Format.Fill.FillType = FillFormatType.Solid;
                    cell.TextFrame.Paragraphs[0].TextRanges[0].Format.Fill.SolidColor.Color = Color.White;
                    cell.FillFormat.FillType = FillFormatType.Solid;
                    cell.FillFormat.SolidColor.Color = Color.Gray;
                }
            }

            if (table.TableRows[2] != null)
            {
                TableRow tableRow = table.TableRows[2];

                foreach (Cell cell in tableRow)
                {
                    cell.TextFrame.Paragraphs[0].TextRanges[0].LatinFont = new TextFont("Tahoma");
                    cell.TextFrame.Paragraphs[0].TextRanges[0].FontHeight = 7;
                    cell.TextFrame.Paragraphs[0].TextRanges[0].Format.Fill.FillType = FillFormatType.Solid;
                    cell.TextFrame.Paragraphs[0].TextRanges[0].Format.Fill.SolidColor.Color = Color.Black;
                    cell.FillFormat.FillType = FillFormatType.Solid;
                    cell.FillFormat.SolidColor.Color = Color.Transparent;
                }
            }
        }

        public void SetHeaderTable(ref ITable table, int reportType, string year)
        {


            // Project Approval Schedule
            if (reportType == 1)
            {
                table.MergeCells(table.TableRows[0][1], table.TableRows[0][2], true);
                table.MergeCells(table.TableRows[0][3], table.TableRows[0][4], true);
                table.MergeCells(table.TableRows[0][5], table.TableRows[0][6], true);
                table.MergeCells(table.TableRows[0][7], table.TableRows[0][8], true);

                for (int i = 1; i < 5; i++)
                {
                    //column 2 4 6 8
                    table.TableRows[0][i * 2].TextFrame.Text = $"Q{i} " + year;
                }

                for (int i = 1; i < 9; i++)
                {
                    //1 to 8
                    table.TableRows[1][i].TextFrame.Text = $"BOD" + (i % 2 == 0 ? "2" : "1");  // stamp  BOD1 or BOD2 by column index
                }
            }

            //Project Approval Schedule (Long term)
            if (reportType == 2)
            {
                table.MergeCells(table.TableRows[0][1], table.TableRows[0][2], true);
                table.MergeCells(table.TableRows[0][3], table.TableRows[0][4], true);
                table.MergeCells(table.TableRows[0][5], table.TableRows[0][6], true);
                table.MergeCells(table.TableRows[0][7], table.TableRows[0][8], true);
                table.MergeCells(table.TableRows[0][9], table.TableRows[0][10], true);

                for (int i = 1; i < 6; i++)
                {
                    //column 2 4 6 8 10
                    table.TableRows[0][i * 2].TextFrame.Text = (int.Parse(year) + i).ToString();
                }

                for (int i = 1; i < 11; i++)
                {
                    //1 to 10
                    table.TableRows[1][i].TextFrame.Text = $"BOD" + (i % 2 == 0 ? "2" : "1");  // stamp  BOD1 or BOD2 by column index
                }
            }
        }

        public void SetReportName(ref Spire.Presentation.Presentation presentation)
        {
            RectangleF rect1 = new RectangleF((presentation.SlideSize.Size.Width / 2) - 127, 20, 254, 50);
            IAutoShape shape = presentation.Slides[0].Shapes.AppendShape(ShapeType.Rectangle, rect1);
            shape.Fill.FillType = FillFormatType.None;
            shape.ShapeStyle.LineColor.Color = Color.Transparent;

            //add text to shape
            shape.TextFrame.Text = "Project Approval Schedule";
            TextRange textRange = shape.TextFrame.TextRange;

            //set the Font
            textRange.Fill.FillType = FillFormatType.Solid;
            textRange.Fill.SolidColor.Color = ColorTranslator.FromHtml("#0070C0"); // color from powerpoint
            textRange.LatinFont = new TextFont("Tahoma");
            textRange.FontHeight = 18;
            textRange.IsBold = TriState.True;
        }


        public void SetHeaderYear(ref Spire.Presentation.Presentation presentation, string year)
        {
            RectangleF rect1 = new RectangleF((float)(100 - 37.5), 35, 75, 40);
            IAutoShape shape = presentation.Slides[0].Shapes.AppendShape(ShapeType.Rectangle, rect1);
            shape.Fill.FillType = FillFormatType.None;
            shape.ShapeStyle.LineColor.Color = Color.Transparent;

            //add text to shape
            shape.TextFrame.Text = "Year : " + year;
            TextRange textRange = shape.TextFrame.TextRange;

            //set the Font
            textRange.Fill.FillType = FillFormatType.Solid;
            textRange.Fill.SolidColor.Color = Color.Black; // color from powerpoint
            textRange.LatinFont = new TextFont("Tahoma");
            textRange.FontHeight = 10;
        }


        public void SetExportDate(ref Spire.Presentation.Presentation presentation)
        {
            RectangleF rect1 = new RectangleF((float)(presentation.SlideSize.Size.Width - 100 - 72), 35, 144, 40);
            IAutoShape shape = presentation.Slides[0].Shapes.AppendShape(ShapeType.Rectangle, rect1);
            shape.Fill.FillType = FillFormatType.None;
            shape.ShapeStyle.LineColor.Color = Color.Transparent;

            //add text to shape
            shape.TextFrame.Text = "Data as of " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
            TextRange textRange = shape.TextFrame.TextRange;

            //set the Font
            textRange.Fill.FillType = FillFormatType.Solid;
            textRange.Fill.SolidColor.Color = Color.Black; // color from powerpoint
            textRange.LatinFont = new TextFont("Tahoma");
            textRange.FontHeight = 8;
        }

        public void AddSlides(ref Spire.Presentation.Presentation presentation)
        {
            if (presentation.Slides.Count >= 10)
            {
                return;
            }

            presentation.Slides.Append();
        }

        public double[] GetColumnsTable(double width_SizeTable, int reportType)
        {
            List<double> columnWidths = new List<double>();

            int columns = 0;
            // Project Approval Schedule
            if (reportType == 1)
            {
                columns = 9;
            }

            //Project Approval Schedule (Long term)
            if (reportType == 2)
            {
                columns = 11;
            }

            double widthForCell = width_SizeTable / columns;

            for (int i = 0; i < columns; i++)
            {
                columnWidths.Add(widthForCell);
            }

            return columnWidths.ToArray();
        }

        public Color GetColorFromEntryModeTitle(string entryModeTitle)
        {

            switch (entryModeTitle)
            {
                case "Divest":
                    return Color.Red;
                    break;
                case "Existing":
                    return Color.Black;
                    break;
                case "JV":
                    return Color.Black;
                    break;
                case "M&A":
                    return Color.Blue;
                    break;
                case "Organic Growth":
                    return Color.Black;
                    break;
                default:
                    return Color.Black;
                    break;
            }

        }

        public async Task<DataTable> GetDataMock()
        {
            DataTable dataTable = await _storeProcedure.ExecuteReturnDatatable($@"SELECT --DISTINCT
                                                                        --so.Year,
                                                                        a.a + LTRIM(RTRIM(s.StrategyTitle)) AS StrategyTitle
                                                                        ,ini.Name ,
                                                                        em.EntryModeTitle
                                                                        FROM Initiatives ini
                                                                        LEFT JOIN Strategies s ON s.StrategyId = ini.StrategyType
                                                                        LEFT JOIN StrategicObjectives so ON so.Id = s.StrategicObjectiveId
                                                                        LEFT JOIN InitiativeDetails inidet ON inidet.InitiativeId = ini.Id
                                                                        LEFT JOIN EntryModes em ON em.EntryModeId = inidet.EntryMode
                                                                        LEFT JOIN (SELECT '1' AS a UNION SELECT '2' AS b UNION SELECT '3' AS c UNION SELECT '4' AS d) a ON 1=1
                                                                        LEFT JOIN (SELECT '1' AS a UNION SELECT '2' AS b UNION SELECT '3' AS c) b ON 1=1
                                                                        WHERE 
                                                                            INitiativeType = 'CIM'
                                                                            AND s.StrategyTitle IS NOT NULL
                                                                            --AND so.Year = 2021
                                                                            AND em.EntryModeTitle IS NOT NULL");

            return dataTable;
        }

        public void RecursiveCheckTableRowAndSplitTableToNewSlide(double height_SizeTable, ref List<Spire.Presentation.Presentation> presentations)
        {
            var oldPresentation = presentations.LastOrDefault();
            var newPresentation = presentations.LastOrDefault();
            ISlide mainSlide = oldPresentation.Slides[oldPresentation.Slides.Count - 1]; //delete data from prev slide
            ITable mainSlideTableData = (mainSlide.Shapes[0] as ITable);

            if (height_SizeTable < mainSlideTableData.Height)
            {
                double tableHeight = mainSlideTableData.Height;
                int startRowToDelete = mainSlideTableData.TableRows.Count - 1;

                while (height_SizeTable < tableHeight)
                {
                    tableHeight -= mainSlideTableData.TableRows[startRowToDelete].Height;

                    if (height_SizeTable < tableHeight && startRowToDelete > 2) //prevent header row
                    {
                        startRowToDelete--;
                    }
                }

                ISlide prevSlideForCheck = oldPresentation.Slides[oldPresentation.Slides.Count - 1];
                int prevTableRow = (prevSlideForCheck.Shapes[0] as ITable).TableRows.Count;

                ISlide slide = oldPresentation.Slides[oldPresentation.Slides.Count - 1];
                //presentation.Slides.Insert(presentation.Slides.Count, slide);
                ISlide prevSlide;
                if (oldPresentation.Slides.Count >= 10)
                {
                    AddPresenttation(ref presentations);
                    newPresentation = presentations.LastOrDefault();
                    newPresentation.Slides.RemoveAt(0); //remove old slide
                    newPresentation.Slides.Append(slide); // append copy slide from prev presenttation

                    prevSlide = oldPresentation.Slides[oldPresentation.Slides.Count - 1]; //delete data from prev slide
                }
                else
                {
                    oldPresentation.Slides.Append(slide);
                    prevSlide = oldPresentation.Slides[oldPresentation.Slides.Count - 2]; //delete data from prev slide
                }



                ITable prevSlideTableData = (prevSlide.Shapes[0] as ITable);

                for (int i = startRowToDelete; i < prevTableRow; i++)
                {
                    prevSlideTableData.TableRows.RemoveAt(prevSlideTableData.TableRows.Count - 1, false);
                }

                int prevSlideRowLeft = (oldPresentation.Slides[oldPresentation.Slides.Count - 2].Shapes[0] as ITable).TableRows.Count - 2; //-2 beacase : do not count header rows

                ////remove row data that duplicate from prev slide
                //ISlide newSlide = presentation.Slides[presentation.Slides.Count - 1]; //delete data in new slide that duplicate from prev slide
                //ITable newSlideTableData = (newSlide.Shapes[0] as ITable);
                ISlide newSlide;
                ITable newSlideTableData;

                if (oldPresentation.Slides.Count >= 10)
                {
                    newSlide = newPresentation.Slides[newPresentation.Slides.Count - 1]; //delete data in new slide that duplicate from prev slide
                }
                else
                {
                    newSlide = oldPresentation.Slides[oldPresentation.Slides.Count - 1]; //delete data in new slide that duplicate from prev slide
                }
                newSlideTableData = (newSlide.Shapes[0] as ITable);

                for (int i = 0; i < prevSlideRowLeft; i++)
                {
                    newSlideTableData.TableRows.RemoveAt(2, false); // remove rows at index 2 (skip header rows)  when remove it will reorder index of row (then remove at index 2 all the time)
                }

                RecursiveCheckTableRowAndSplitTableToNewSlide(height_SizeTable, ref presentations);
            }
        }
        //public async Task<ActionResult> Get([FromQuery]string storeName, [FromQuery] string param, [FromQuery] int reportID)
        //{


        //    return Ok();
        //}


        private async Task<MemoryStream> MergeSlides(List<Spire.Presentation.Presentation> presentations)
        {
            var nowFileName = DateTime.Now.ToString("yyyyMMddHHmmssfff") + ".pptx";
            
            MemoryStream destinationFile = new MemoryStream();
            
            int id = 0;


            presentations[0].SaveToFile(destinationFile, FileFormat.Pptx2013);

            presentations.RemoveAt(0); //remove destinationFile from loop

            foreach (var presentation in presentations)
            {
                MemoryStream sourceFile = new MemoryStream();
                presentation.SaveToFile(sourceFile, FileFormat.Pptx2013);

                // Open the destination presentation.
                using (PresentationDocument myDestDeck =
                  PresentationDocument.Open(destinationFile,
                  true))
                {
                    PresentationPart destPresPart = myDestDeck.PresentationPart;

                    // If the merged presentation does not have a SlideIdList 
                    // element yet, add it.
                    if (destPresPart.Presentation.SlideIdList == null)
                        destPresPart.Presentation.SlideIdList = new SlideIdList();

                    // Open the source presentation. This will throw an exception if
                    // the source presentation does not exist.
                    using (PresentationDocument mySourceDeck =
                      PresentationDocument.Open(sourceFile, false))
                    {
                        PresentationPart sourcePresPart =
                          mySourceDeck.PresentationPart;

                        // Get unique ids for the slide master and slide lists
                        // for use later.
                        uniqueId =
                          GetMaxSlideMasterId(
                            destPresPart.Presentation.SlideMasterIdList);

                        uint maxSlideId =
                          GetMaxSlideId(destPresPart.Presentation.SlideIdList);

                        // Copy each slide in the source presentation, in order, to 
                        // the destination presentation.
                        foreach (SlideId slideId in
                          sourcePresPart.Presentation.SlideIdList)
                        {
                            SlidePart sp;
                            SlidePart destSp;
                            SlideMasterPart destMasterPart;
                            string relId;
                            SlideMasterId newSlideMasterId;
                            SlideId newSlideId;

                            // Create a unique relationship id.
                            id++;
                            sp =
                              (SlidePart)sourcePresPart.GetPartById(
                                slideId.RelationshipId);

                            relId = "a" + DateTime.Now.ToString("yyyyMMddHHmmss") + id.ToString();

                            // Add the slide part to the destination presentation.
                            destSp = destPresPart.AddPart<SlidePart>(sp, relId);

                            // The slide master part was added. Make sure the
                            // relationship between the main presentation part and
                            // the slide master part is in place.
                            destMasterPart = destSp.SlideLayoutPart.SlideMasterPart;
                            destPresPart.AddPart(destMasterPart);

                            // Add the slide master id to the slide master id list.
                            uniqueId++;
                            newSlideMasterId = new SlideMasterId();
                            newSlideMasterId.RelationshipId =
                              destPresPart.GetIdOfPart(destMasterPart);
                            newSlideMasterId.Id = uniqueId;

                            destPresPart.Presentation.SlideMasterIdList.Append(
                              newSlideMasterId);

                            // Add the slide id to the slide id list.
                            maxSlideId++;
                            newSlideId = new SlideId();
                            newSlideId.RelationshipId = relId;
                            newSlideId.Id = maxSlideId;

                            destPresPart.Presentation.SlideIdList.Append(newSlideId);
                        }

                        // Make sure that all slide layout ids are unique.
                        FixSlideLayoutIds(destPresPart);
                    }

                    // Save the changes to the destination deck.
                    destPresPart.Presentation.Save();
                    //Stream stream = new MemoryStream();
                    //destPresPart.FeedData(stream);
                    //return await Task.FromResult(stream);

                    myDestDeck.Save();
                }
            }
            return await Task.FromResult(new MemoryStream(destinationFile.ToArray()));
        }

        static void FixSlideLayoutIds(PresentationPart presPart)
        {
            // Make sure that all slide layouts have unique ids.
            foreach (SlideMasterPart slideMasterPart in
              presPart.SlideMasterParts)
            {
                foreach (SlideLayoutId slideLayoutId in
                  slideMasterPart.SlideMaster.SlideLayoutIdList)
                {
                    uniqueId++;
                    slideLayoutId.Id = (uint)uniqueId;
                }

                slideMasterPart.SlideMaster.Save();
            }
        }

        static uint GetMaxSlideId(SlideIdList slideIdList)
        {
            // Slide identifiers have a minimum value of greater than or
            // equal to 256 and a maximum value of less than 2147483648. 
            uint max = 256;

            if (slideIdList != null)
                // Get the maximum id value from the current set of children.
                foreach (SlideId child in slideIdList.Elements<SlideId>())
                {
                    uint id = child.Id;

                    if (id > max)
                        max = id;
                }

            return max;
        }

        static uint GetMaxSlideMasterId(SlideMasterIdList slideMasterIdList)
        {
            // Slide master identifiers have a minimum value of greater than
            // or equal to 2147483648. 
            uint max = 2147483648;

            if (slideMasterIdList != null)
                // Get the maximum id value from the current set of children.
                foreach (SlideMasterId child in
                  slideMasterIdList.Elements<SlideMasterId>())
                {
                    uint id = child.Id;

                    if (id > max)
                        max = id;
                }

            return max;
        }
    }
}