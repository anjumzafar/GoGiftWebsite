using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GoGiftWebsite.Areas.gpanel.Models
{
    [Table("tbl_EmailTemplates")]
    public class TblEmailTemplates
    {
        [Key]
        public int EmailTemplateID { get; set; }
        public string? ModuleName { get; set; }
        public string? EmailTitle { get; set; }
        public string? FromName { get; set; }
        public string? FromEmail { get; set; }
        public string? CC { get; set; }
        public string? BCC { get; set; }
        public string? Attachment { get; set; }
        public string? DefaultSubject { get; set; }
        public string? DefaultBody { get; set; }
        public string? CustomSubject { get; set; }
        public string? CustomBody { get; set; }
        public string? SMTPServer { get; set; }
        public string? FromEmailPassword { get; set; }
        public int SortOrderNo { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
