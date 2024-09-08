using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace GoGiftWebsite.Areas.gpanel.Models
{
    [Table("tbl_Vendors")]
    public class TblVendors
    {
        [Key]
        public int VendorID { get; set; }
        public string? VendorDisplayName { get; set; }
        [Required]
        [MaxLength(50)]
        [DisplayName("Vendor Name")]
        public required string VendorName { get; set; }
        public string? CompanyName { get; set; }

        public string? ContactPerson { get; set; }
        public string? MobileNo { get; set; }
        public string? EmailID { get; set; }
        public string? CCEmailID { get; set; }
        public string? AlternateNo { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Pincode { get; set; }
        public string? Country { get; set; }
        public string? AccountName { get; set; }

        public string? AccountNo { get; set; }
        public string? BankName { get; set; }
        public string? Branch { get; set; }
        public string? IFSCCode { get; set; }
        public string? Password { get; set; }

        public int Priority { get; set; }
        public int CreatedBy { get; set; }
        public DateOnly CreatedOn { get; set; } = DateOnly.FromDateTime(DateTime.Now);
        public int ModifiedBy { get; set; }
        public DateOnly ModifiedOn { get; set; } = DateOnly.FromDateTime(DateTime.Now);
        public bool IsActive { get; set; } = true;

    }
}
