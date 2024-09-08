using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GoGiftWebsite.Areas.gpanel.Models
{
    [Table("tbl_PromotionalCodes")]
    public class TblPromotionalCodes
    {
        [Key]
        public int PromotionalCodeID { get; set; }
        public string? PromotionalCode { get; set; }
        public int PromotionalDiscount { get; set; }
        public string? DiscountType { get; set; }
        
        public int PromotionalTypeID { get; set; }

        [ForeignKey("PromotionalTypeID")]
        public virtual TblDDValues? TblDDValue { get; set; }

        public int MinimumCartValue { get; set; }
        public int MaximumDiscount { get; set; }
        [DisplayFormat(DataFormatString = "{DD/MM/YYYY}")]
        public DateOnly ExpiryDate { get; set; }
        public string? Remark { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
