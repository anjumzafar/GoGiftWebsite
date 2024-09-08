using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GoGiftWebsite.Areas.gpanel.Models
{
    [Table("tbl_City")]
    public class TblCity
    {
        [Key]
        public int CityID { get; set; }
        [Required]
        [MaxLength(50)]
        public required string City { get; set; }
        public int DeliveryCharge { get; set; }
        public bool IsMidNightDeliveryPossible { get; set; } = true;
        public bool IsActive { get; set; } = true;
    }
}
