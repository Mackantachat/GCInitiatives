using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Presentation;
using Drawing = DocumentFormat.OpenXml.Drawing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using PTT_GC_API.Data;
using PTT_GC_API.Data.Interface;
using System.Data;
using Microsoft.Extensions.FileProviders;
namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExportBudgetSlideController : ControllerBase
    {
        private readonly StoreProcedureInterface _repository;
        private readonly IHostEnvironment _hostingEnvironment;
        private int i = 0;
        public ExportBudgetSlideController(IHostEnvironment hostingEnvironment, StoreProcedureInterface repository)
        {
            _hostingEnvironment = hostingEnvironment;
            _repository = repository;
        }

        [HttpGet("GenerateBGSlide")]
        public async Task<ActionResult> GenerateBGSlide([FromQuery]string storeName, [FromQuery] string param, [FromQuery] int reportID)
        {

            string nowTime = DateTime.Now.ToString("yyyyMMddHHmmss");
            string newFile = @$"BGSlide_{nowTime}.pptx";

            DataTable dt = new DataTable();
            try
            {
                dt = await _repository.ExecuteReturnDatatable($"EXEC {storeName} '{reportID}'");

                if (dt.Rows.Count <= 0)
                {
                    return Ok("Data was not found.");
                }


                //copy the document which contains the style definition we want use in generated
                System.IO.File.Copy(_hostingEnvironment.ContentRootPath + @"/GCtemplate.pptx", newFile, true);

                using (PresentationDocument presentationDocument = PresentationDocument.Open(newFile, true))
                {
                    PresentationPart presentationPart = presentationDocument.PresentationPart;

                    SlidePart slideTemplate = (SlidePart)presentationPart.GetPartById("rId3");

                    //int i = 1;


                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        string imgId = "rIdImg" + i;

                        SlidePart newSlide = CloneSlidePart(presentationPart, slideTemplate);
                        ImagePart imagePart = newSlide.AddImagePart(ImagePartType.Jpeg, imgId);



                        Stream _imgStream = System.IO.File.Open(_hostingEnvironment.ContentRootPath + @"/Picture1.jpg", FileMode.Open, FileAccess.Read);
                        imagePart.FeedData(_imgStream);
                        _imgStream.Close();

                        for (int j = 0; j < dt.Columns.Count; j++)
                        {
                            // place holder = column name ,,  value = value in rows
                            SwapPlaceholderText(newSlide, dt.Columns[j].ColumnName.ToString(), dt.Rows[i][j].ToString());
                        }
                        SwapPhoto(newSlide, imgId);

                        newSlide.Slide.Save();

                    }


                    DeleteTemplateSlide(presentationPart, slideTemplate);

                    presentationPart.Presentation.Save();
                }
                MemoryStream memoryStreamOutput = new MemoryStream();

                using (memoryStreamOutput)
                {
                    using (FileStream file = new FileStream(_hostingEnvironment.ContentRootPath + "/" + newFile, FileMode.Open, FileAccess.Read))
                    {
                        await file.CopyToAsync(memoryStreamOutput);
                    }
                }


                System.IO.File.Delete(_hostingEnvironment.ContentRootPath + "/" + newFile);


                return File(new MemoryStream(memoryStreamOutput.ToArray()), "application/vnd.openxmlformats", "output_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".pptx");

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            //if (storeName == null)
            //{
            //    return NoContent();
            //}

            //string nowTime = DateTime.Now.ToString("yyyyMMddHHmmss");
            //string newFile = @$"Report_{nowTime}.xlsx";
            //DataTable datatable = await _repository.ExecuteReturnDatatable($"EXEC {storeName} '{reportID}'");

            //return GenerateExcelFromDatatable(datatable, newFile);





            void InsertContent(SlidePart slidePart, string fullName, string email, string sales,
                string salesQuota)
            {
                SwapPlaceholderText(slidePart, "FullName", fullName);
                SwapPlaceholderText(slidePart, "EmailAddress", email);
                SwapPlaceholderText(slidePart, "TotalSales", sales);
                SwapPlaceholderText(slidePart, "SalesQuota", salesQuota);
            }

            void SwapPhoto(SlidePart slidePart, string imgId)
            {
                //Test ImagePart
                var blipArray = slidePart.Slide.Descendants<Drawing.Blip>().ToList();
                var getStreamFromImagePart = slidePart.ImageParts.ToList()[0].GetStream();
                //----------------------------

                Drawing.Blip blip = slidePart.Slide.Descendants<Drawing.Blip>().Last();

                blip.Embed = imgId;

                slidePart.Slide.Save();

            }

            void SwapPlaceholderText(SlidePart slidePart, string placeholder, string value)
            {
                List<Drawing.Text> textList = slidePart.Slide.Descendants<Drawing.Text>().Where(
                   t => t.Text.Equals(placeholder)).ToList();

                foreach (Drawing.Text text in textList)
                {
                    text.Text = value;
                }

            }

            void DeleteTemplateSlide(PresentationPart presentationPart, SlidePart slideTemplate)
            {
                SlideIdList slideIdList = presentationPart.Presentation.SlideIdList;

                foreach (SlideId slideId in slideIdList.ChildElements)
                {
                    if (slideId.RelationshipId.Value.Equals("rId3"))
                    {
                        slideIdList.RemoveChild(slideId);
                    }
                }

                presentationPart.DeletePart(slideTemplate);
            }


            SlidePart CloneSlidePart(PresentationPart presentationPart, SlidePart slideTemplate)
            {
                SlidePart newSlidePart = presentationPart.AddNewPart<SlidePart>("newSlide" + i);
                i++;

                using (var _thisStream = slideTemplate.GetStream(FileMode.Open))
                {
                    newSlidePart.FeedData(_thisStream);

                    newSlidePart.AddPart(slideTemplate.SlideLayoutPart);

                    SlideIdList slideIdList = presentationPart.Presentation.SlideIdList;

                    uint maxSlideId = 1;
                    SlideId prevSlideId = null;
                    foreach (SlideId slideId in slideIdList.ChildElements)
                    {
                        if (slideId.Id > maxSlideId)
                        {
                            maxSlideId = slideId.Id;
                            prevSlideId = slideId;
                        }
                    }

                    maxSlideId++;

                    SlideId newSlideId = slideIdList.InsertAfter(new SlideId(), prevSlideId);
                    newSlideId.Id = maxSlideId;
                    newSlideId.RelationshipId = presentationPart.GetIdOfPart(newSlidePart);
                }



                return newSlidePart;
            }
        }
    }
}