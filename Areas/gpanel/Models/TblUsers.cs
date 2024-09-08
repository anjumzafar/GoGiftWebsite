using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GoGiftWebsite.Areas.gpanel.Models
{
    [Table("tbl_Users")]
    public class TblUsers
    {
        [Key]
        public int UserID { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? EmailID { get; set; } // EmailID is the User Name
        public string? MobileNo { get; set; }
        public string? Password { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsActive { get; set; }
    }
}
