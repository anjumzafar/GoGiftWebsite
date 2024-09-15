using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using GoGiftWebsite.Areas.gpanel.Models;

namespace GoGiftWebsite.Areas.gpanel.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<TblCustomers> Customer { get; set; }
        public DbSet<TblCustomerPoint> CustomerPoint { get; set; }
        public DbSet<TblCustomerRecipientAddress> CustomerRecipientAddress { get; set; }
        public DbSet<TblVendors> Vendor { get; set; }
        public DbSet<TblCity> City { get; set; }
        public DbSet<TblPromotionalCodes> PromotionalCode { get; set; }
        public DbSet<TblDropDown> DropDown { get; set; }
        public DbSet<TblDDValues> DDValue { get; set; }
        public DbSet<TblEmailTemplates> EmailTemplate { get; set; }
        public DbSet<TblPages> Page { get; set; }
        public DbSet<TblCategory> Category { get; set; }

        public DbSet<TblUsers> User { get; set; }

        //public IQueryable<TblCustomers> SearchCustomers(string contactName)
        //{
        //    SqlParameter pContactName = new SqlParameter("@ContactName", contactName);
        //    return Customer.FromSql($"EXECUTE Customers_SearchCustomers @ContactName={pContactName}");
        //}
    }
}
