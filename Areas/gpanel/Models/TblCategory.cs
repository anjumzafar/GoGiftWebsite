using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GoGiftWebsite.Areas.gpanel.Models
{
    [Table("tbl_Category")]
    public class TblCategory
    {
        [Key]
        public int CategoryID { get; set; }
        public string? CategoryName { get; set; }
        public string? Description { get; set; }
        public int ParentCategoryID { get; set; }
        public string? CategoryImage { get; set; }
        public int SortOrderNo { get; set; }
        public bool IsActive { get; set; }

    }
}
