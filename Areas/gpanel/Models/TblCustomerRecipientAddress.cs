using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GoGiftWebsite.Areas.gpanel.Models
{
    [Table("tbl_CustomerRecipientAddress")]
    public class TblCustomerRecipientAddress
    {
        [Key]
        public int CustomerRecipientAddressID { get; set; }
        public string? RecipientName { get; set; }
        public int CustomerID { get; set; }
        public string? STDCode { get; set; }
        public string? MobileNo { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Pincode { get; set; }
        public string? Country { get; set; }
    }
}
