using PTT_GC_API.Dtos.DimMemberList;
using PTT_GC_API.Models.Initiative;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface IDimMemberRepository
    {
        Task<IEnumerable<DimMember>> GetDimMember(DimMemberList DimMemberList);
        Task<string[]> CreateProjectSponsor(int id, string[] form);
        Task<string[]> CreateITFocalPoint(int id, string[] form);
        Task<string[]> CreateImpactedParties(int id, string[] form);
        Task<string[]> CreateTeamMember(int id, string[] form);
        Task<string[]> CreateDigitalFocalPoint(int id, string[] form);
    }
}
