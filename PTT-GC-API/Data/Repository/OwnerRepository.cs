using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.MaxApprover;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.Owner;

namespace PTT_GC_API.Data.Repository
{
    public class OwnerRepository : OwnerInterface
    {
        private readonly DataContext _context;
        public OwnerRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Owner>> GetList([FromQuery]OwnerParams OwnerParams)
        {
            List<Owner> owners;

            if (!string.IsNullOrWhiteSpace(OwnerParams.Text))
            {
                owners = new List<Owner>();
                List<Owner> ownerQuery = await _context.Owners.Where(c => c.OwnerName.Contains(OwnerParams.Text)).OrderBy(c => c.OwnerName).Take(50).ToListAsync();
                owners.AddRange(ownerQuery.Where(o => !string.IsNullOrWhiteSpace(o.EmploymentStatusTxt) && o.EmploymentStatusTxt.ToUpper().Equals("ACTIVE")));
                owners.AddRange(ownerQuery.Where(o => string.IsNullOrWhiteSpace(o.EmploymentStatusTxt)));
            }
            else
            {
                owners = await _context.Owners.Where(c => !string.IsNullOrWhiteSpace(c.EmploymentStatusTxt)).OrderBy(c => c.OwnerName).Take(50).ToListAsync();
            }


            return owners;
        }

        public async Task<IEnumerable<Owner>> GetEmailList([FromQuery]OwnerParams OwnerParams)
        {
            var owner = await _context.Owners.Where(o => o.Email == OwnerParams.Text).ToListAsync();
            return owner;
        }

        public async Task<Owner> GetName([FromQuery]OwnerParams OwnerParams)
        {
            var owner = await _context.Owners.Where(o => o.OwnerName == OwnerParams.Text).FirstOrDefaultAsync();
            return owner;
        }

        public async Task<Owner> GetEmail([FromQuery]OwnerParams OwnerParams)
        {
            var owner = await _context.Owners.Where(o => o.Email == OwnerParams.Text).FirstOrDefaultAsync();
            return owner;
        }

        public async Task<Owner> GetUser(string username)
        {
            var owner = await _context.Owners.Where(o => o.Email == username).FirstOrDefaultAsync();
            return owner;
        }

        public async Task<Owner> GetNameMaxApprover(NameMaxApprover NameMaxApprover)
        {
            var owner = await _context.Owners.Where(o => o.Email == NameMaxApprover.Email).FirstOrDefaultAsync();
            return owner;
        }

        public async Task<List<string>> GetOwnerName()
        {
            return  await _context.Owners.Where(o => o.OwnerName != "").OrderBy(o => o.OwnerName).Select(o => o.EmployeeID).ToListAsync();
        }

        public async Task<List<string>> GetTeamSupportName()
        {
            return await _context.Owners.Where(o => o.OwnerName != "").OrderBy(o => o.OwnerName).Select(o => o.OwnerName).Take(20).ToListAsync();
        }

        public async Task<Owner> GetVP([FromQuery]OwnerParams OwnerParams)
        {
            var owner = await _context.Owners.Where(o => o.OwnerName == OwnerParams.Text).FirstOrDefaultAsync();
            return owner;
        }

    }
}