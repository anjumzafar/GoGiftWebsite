using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GoGiftWebsite.Areas.gpanel.Models
{
    public class TblCustomerPoint
    {
        [Key]
        public int CustomerPointID { get; set; }
        public int CustomerID { get; set; }

        [ForeignKey("CustomerID")]
        public virtual TblCustomers? TblCustomer { get; set; }
        //[ForeignKey("OrderID")]
        //public virtual TblOrders? TblOrder { get; set; }

        public int Point { get; set; }

        public int PointSource { get; set; }


        [ForeignKey("PointSource")]
        public virtual TblDDValues? TblDDValue { get; set; }
  
    }
}
