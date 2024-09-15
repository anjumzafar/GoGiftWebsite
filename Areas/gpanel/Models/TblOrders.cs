using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GoGiftWebsite.Areas.gpanel.Models
{
    [Table("tbl_Orders")]
    public class TblOrders
    {
            [Key]
            public int OrderID { get; set; }

            [ForeignKey("TblCustomers")]
            public int? CustomerID { get; set; }

            [StringLength(50)]
            public string CustomerName { get; set; }

            [StringLength(30)]
            public string STDCode { get; set; }

            [StringLength(50)]
            public string MobileNo { get; set; }

            [StringLength(500)]
            public string Address { get; set; }

            [StringLength(50)]
            public string City { get; set; }

            [StringLength(10)]
            public string Pincode { get; set; }

            [StringLength(50)]
            public string State { get; set; }

            [StringLength(50)]
            public string Country { get; set; }

            [StringLength(100)]
            public string EmailID { get; set; }

            [StringLength(50)]
            public string DeliveryName { get; set; }

            [StringLength(50)]
            public string DeliverySTDCode { get; set; }

            [StringLength(50)]
            public string DeliveryMobileNo { get; set; }

            [StringLength(500)]
            public string DeliveryAddress { get; set; }

            [StringLength(50)]
            public string DeliveryCity { get; set; }

            [StringLength(50)]
            public string DeliveryState { get; set; }

            [StringLength(30)]
            public string DeliveryPincode { get; set; }

            [StringLength(50)]
            public string DeliveryCountry { get; set; }

            [StringLength(100)]
            public string DeliveryEmailID { get; set; }

            [StringLength(30)]
            public string Currency { get; set; }

            public int CurrencyValue { get; set; }

            public int TotalAmount { get; set; }

            [StringLength(1000)]
            public string MessageOnCard { get; set; }

            [StringLength(50)]
            public string DeliveryType { get; set; }

            public DateTime? PreferredDate { get; set; }

            [StringLength(50)]
            public string PreferredTime { get; set; }

            public int DeliveryCharge { get; set; }

            [StringLength(50)]
            public string PromotionalCode { get; set; }

            public int PromotionalDiscount { get; set; }

            public int PointRedemption { get; set; }

            [StringLength(4000)]
            public string CustomerNotes { get; set; }

            [StringLength(4000)]
            public string EmployeeNotes { get; set; }

            [StringLength(50)]
            public string ReferCode { get; set; }

            public int CreatedBy { get; set; }

            public DateTime? CreatedOn { get; set; }

            public bool? IsActive { get; set; }

            // Navigation property for the related Customer
            public virtual TblCustomers? TblCustomer { get; set; }

        public virtual ICollection<TblOrderDetails> TblOrderDetails { get; set; }
    }

    }

