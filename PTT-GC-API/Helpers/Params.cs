namespace PTT_GC_API.API.Helpers
{
    public class Params
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 5;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
        public string WorkStream { get; set; }
        public string Type { get; set; }
        public string OrderBy { get; set; }
    }
}