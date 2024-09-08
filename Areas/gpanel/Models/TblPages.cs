using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GoGiftWebsite.Areas.gpanel.Models
{
    [Table("tbl_Pages")]
    public class TblPages
    {
        [Key]
        public int PageID { get; set; }
        [Required]
        public string? PageName { get; set; }
        public string PageURL { get; set; } = string.Empty;
        public string? PageTitle { get; set; }
        public string? PageMeta { get; set; }
        public string? PageKeyword { get; set; }
        public string? PageDescription { get; set; }
        [ForeignKey("TblCategory")]
        public int CategoryID { get; set; }
        public virtual TblCategory? Category { get; set; }
        [ForeignKey("TblCity")]
        public int CityID { get; set; }
        public virtual TblCity? City { get; set; }
        public string? HeaderContent { get; set; }
        public string? FooterContent { get; set; }
        public string? GEORegion { get; set; }
        public string? GEOPlacename { get; set; }
        public string? GEOPosition { get; set; }
        public string? ICBM { get; set; }
        public bool IsActive { get; set; }

    }
}
