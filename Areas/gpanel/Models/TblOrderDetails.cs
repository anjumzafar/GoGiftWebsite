using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GoGiftWebsite.Areas.gpanel.Models
{
    [Table("tbl_OrderDetails")]
    public class TblOrderDetails
    {
        [Key]
        public int OrderDetailID { get; set; }

        [ForeignKey("TblOrders")]
        public int? OrderID { get; set; }

        //[ForeignKey("Product")]
        public int? ProductID { get; set; }

        [StringLength(500)]
        public string? ProductName { get; set; }

        public int? Price { get; set; }

        public int? Quantity { get; set; }

        public int? TaxID { get; set; }

        [StringLength(10)]
        public string TaxCode { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        public decimal? TaxValue { get; set; }

        [StringLength(50)]
        public string ProductWeightPcsSize { get; set; }

        [StringLength(50)]
        public string MessageOnProduct { get; set; }

        [StringLength(200)]
        public string PhotoToBePrintOnProduct { get; set; }

        // Navigation property for the related Order
        public virtual TblOrders TblOrder { get; set; }


    }
}
