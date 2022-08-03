using Microsoft.Azure.Storage.Blob.Protocol;
using NPOI.XSSF.UserModel.Helpers;
using PTT_GC_API.Models.Outstanding;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.Outstanding
{
    public class OutstandingFrontModel
    {
        //public SearchFormModel SearchForm { get; set; }
        public OutstandingForm OutstandingForm { get; set; }
    }

    public class OutstandingForm
    {
        public int Id { get; set; }
        public int? InitiativeId { get; set; }
        public int? Year { get; set; }
        public string Month { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? BudgetBaht { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ActualBaht { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? PrItemBaht { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? PoItemBaht { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? CommitmentBaht { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Contingency { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EstimateAtCompletion { get; set; }
        public bool? IsDeleted { get; set; }
        public List<OutstandingData> OutstandingFormArray { get; set; }
    }

    //public class SearchFormModel
    //{
    //    public DateTime Month { get; set; }
    //}
}
