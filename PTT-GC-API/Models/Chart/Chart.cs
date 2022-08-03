namespace PTT_GC_API.Models.Chart
{
    public class StackedChart
    {
        public string TitleText { get; set; }  // Stacked column chart
        public string XAxisCatagories { get; set; }  // ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        public string YAxisTitleText { get; set; } // Total fruit consumption
        public string SeriesName { get; set; }  // Jonh | Jane | Joe
        public string SeriesData { get; set; }  //[5, 3, 4, 7, 2]
    }
}
