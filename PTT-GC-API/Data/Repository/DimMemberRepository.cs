using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.DimMemberList;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.Initiative;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class DimMemberRepository : IDimMemberRepository
    {
        private readonly DataContext _context;
        public DimMemberRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<DimMember>> GetDimMember(DimMemberList DimMemberList)
        {
            return await _context.DimMembers.Where(d => d.InitiativeId == DimMemberList.InitiativeId && d.MemberType == DimMemberList.MemberType).ToListAsync();
        }

        public async Task<string[]> CreateImpactedParties(int id, string[] form)
        {
            if (_context.DimMembers.Where(i => i.MemberType == "ImpactedParties" && i.InitiativeId == id).Any())
            {
                var data = await _context.DimMembers.Where(i => i.MemberType == "ImpactedParties" && i.InitiativeId == id).ToListAsync();
                foreach (var entity in data)
                {
                    // Temporary Log for Invetigate 2021-07-21
                    LogInsight.Log(entity, "DimMember-33", SQLCommandType.DELETE, false);
                    // End log
                    _context.DimMembers.Remove(entity);
                }
                await _context.SaveChangesAsync();
            }
            foreach (string item in form)
            {
                var DimMember = new DimMember { InitiativeId = id, MemberType = "ImpactedParties", MemberName = item };
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(DimMember, "DimMember-43", SQLCommandType.INSERT, false);
                // End log
                await _context.DimMembers.AddAsync(DimMember);
                await _context.SaveChangesAsync();
            }
            return form;
        }

        public async Task<string[]> CreateITFocalPoint(int id, string[] form)
        {
            if (_context.DimMembers.Where(i => i.MemberType == "ITFocalPoint" && i.InitiativeId == id).Any())
            {
                var data = await _context.DimMembers.Where(i => i.MemberType == "ITFocalPoint" && i.InitiativeId == id).ToListAsync();
                foreach (var entity in data)
                {
                    // Temporary Log for Invetigate 2021-07-21
                    LogInsight.Log(entity, "DimMember-59", SQLCommandType.DELETE, false);
                    // End log
                    _context.DimMembers.Remove(entity);
                }
                await _context.SaveChangesAsync();
            }
            foreach (string item in form)
            {
                var DimMember = new DimMember { InitiativeId = id, MemberType = "ITFocalPoint", MemberName = item };
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(DimMember, "DimMember-69", SQLCommandType.INSERT, false);
                // End log
                await _context.DimMembers.AddAsync(DimMember);
                await _context.SaveChangesAsync();
            }
            return form;
        }

        public async Task<string[]> CreateProjectSponsor(int id, string[] form)
        {
            if (_context.DimMembers.Where(i => i.MemberType == "ProjectSponsor" && i.InitiativeId == id).Any())
            {
                var data = await _context.DimMembers.Where(i => i.MemberType == "ProjectSponsor" && i.InitiativeId == id).ToListAsync();
                foreach (var entity in data)
                {
                    // Temporary Log for Invetigate 2021-07-21
                    LogInsight.Log(entity, "DimMember-85", SQLCommandType.DELETE, false);
                    // End log
                    _context.DimMembers.Remove(entity);
                }
                await _context.SaveChangesAsync();
            }
            foreach (string item in form)
            {
                var DimMember = new DimMember { InitiativeId = id, MemberType = "ProjectSponsor", MemberName = item };
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(DimMember, "DimMember-95", SQLCommandType.INSERT, false);
                // End log
                await _context.DimMembers.AddAsync(DimMember);
                await _context.SaveChangesAsync();
            }
            return form;
        }

        public async Task<string[]> CreateTeamMember(int id, string[] form)
        {
            if (_context.DimMembers.Where(i => i.MemberType == "TeamMember" && i.InitiativeId == id).Any())
            {
                var data = await _context.DimMembers.Where(i => i.MemberType == "TeamMember" && i.InitiativeId == id).ToListAsync();
                foreach (var entity in data)
                {
                    // Temporary Log for Invetigate 2021-07-21
                    LogInsight.Log(entity, "DimMember-111", SQLCommandType.DELETE, false);
                    // End log
                    _context.DimMembers.Remove(entity);
                }
                await _context.SaveChangesAsync();
            }
            foreach (string item in form)
            {
                var DimMember = new DimMember { InitiativeId = id, MemberType = "TeamMember", MemberName = item };
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(DimMember, "DimMember-121", SQLCommandType.INSERT, false);
                // End log
                await _context.DimMembers.AddAsync(DimMember);
                await _context.SaveChangesAsync();
            }
            return form;
        }

        public async Task<string[]> CreateDigitalFocalPoint(int id, string[] form)
        {
            if (_context.DimMembers.Where(i => i.MemberType == "DigitalFocalPoint" && i.InitiativeId == id).Any())
            {
                var data = await _context.DimMembers.Where(i => i.MemberType == "DigitalFocalPoint" && i.InitiativeId == id).ToListAsync();
                foreach (var entity in data)
                {
                    // Temporary Log for Invetigate 2021-07-21
                    LogInsight.Log(entity, "DimMember-137", SQLCommandType.DELETE, false);
                    // End lo
                    _context.DimMembers.Remove(entity);
                }
                await _context.SaveChangesAsync();
            }
            foreach (string item in form)
            {
                var DimMember = new DimMember { InitiativeId = id, MemberType = "DigitalFocalPoint", MemberName = item };
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(DimMember, "DimMember-147", SQLCommandType.INSERT, false);
                // End log
                await _context.DimMembers.AddAsync(DimMember);
                await _context.SaveChangesAsync();
            }
            return form;
        }
    }
}
