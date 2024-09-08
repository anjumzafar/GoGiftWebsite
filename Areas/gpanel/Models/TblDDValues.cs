using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GoGiftWebsite.Areas.gpanel.Models
{
    [Table("tbl_DDValues")]
    public class TblDDValues
    {
        [Key]
        public int DDValueID { get; set; }
        public int DropDownID { get; set; }
        public string? DDValue { get; set; }
        public string? DDKey { get; set; }
        public int SortOrderNo { get; set; }
        public bool IsActive { get; set; }
    }
}