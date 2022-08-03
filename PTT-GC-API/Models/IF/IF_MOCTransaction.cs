using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.IF
{
    public class IF_MOCTransaction
    {
        [StringLength(50)]
        public string ReqNo { get; set; }
        [StringLength(50)]
        public string MOCNo { get; set; }
        public int MoCTypeID { get; set; }
        [StringLength(1000)]
        public string ProjectName { get; set; }
        [StringLength(100)]
        public string MOCChampion { get; set; }
        [StringLength(100)]
        public string Initiator { get; set; }
        public DateTime? CreateDate { get; set; }
        public int? StepID { get; set; }
        public DateTime? ExpireDate { get; set; }
        public DateTime? P1FinDate { get; set; }
        public DateTime? P2FinDate { get; set; }
        public DateTime? P3FinDate { get; set; }
        public DateTime? P4FinDate { get; set; }
        public DateTime? CompleteStartUpDate { get; set; }
        public DateTime? UploadDate { get; set; }
        [StringLength(100)]
        public string MOCID { get; set; }
        [StringLength(9)]
        public string part { get; set; }
        public int EasyTrackingID { get; set; }
        public int MoCCategory { get; set; }
        [StringLength(100)]
        public string SHERepDM { get; set; }
        [StringLength(100)]
        public string SHERepDMDisp { get; set; }
        [StringLength(100)]
        public string SHERepReviewer { get; set; }
        [StringLength(100)]
        public string SHERepReviewerDisp { get; set; }
        [StringLength(100)]
        public string ProcessEngDM { get; set; }
        [StringLength(100)]
        public string ProcessEngDMDisp { get; set; }
        [StringLength(100)]
        public string ProcessEngReviewer { get; set; }
        [StringLength(100)]
        public string ProcessEngReviewerDisp { get; set; }
        public DateTime? DeadlinePart2 { get; set; }
        public DateTime? DeadlinePart3 { get; set; }
        [StringLength(100)]
        public string UnitName { get; set; }
        public DateTime? BasicDesignReviewDate { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
}
