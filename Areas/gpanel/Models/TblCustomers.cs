using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace GoGiftWebsite.Areas.gpanel.Models
{
    [Table("tbl_Customers")]
    public class TblCustomers
    {
        [Key]
        public int CustomerID { get; set; }
        [Required]
        [MaxLength(50)]
        [DisplayName("Customer Name")]
        public required string CustomerName { get; set; }
        [DisplayFormat(DataFormatString = "{0:DD MMM YYYY}")]
        public DateOnly? DOB { get; set; }
        public string? Gender { get; set; }
        public string? MobileNo { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Pincode { get; set; }
        public string? Country { get; set; }
        public required string EmailID { get; set; }
        public required string Password { get; set; }
        [DisplayFormat(DataFormatString = "{0:DD/MMM/YYYY}")]
        public DateOnly CreatedOn { get; set; } = DateOnly.FromDateTime(DateTime.Now);
        public bool IsActive { get; set; } = true;
    }
}
