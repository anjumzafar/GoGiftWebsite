using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GoGiftWebsite.Areas.gpanel.Models
{
    [Table("tbl_DropDown")]
    public class TblDropDown
    {
        [Key]
        public int DropDownID { get; set; }
        public string? DDName { get; set; }
        public string? DropDownKey { get; set; }
        public bool IsActive { get; set; }
    }
}
