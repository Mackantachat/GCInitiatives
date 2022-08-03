using System.Collections.Generic;
using System.Threading.Tasks;
using PTT_GC_API.Dtos.VacPic;
using PTT_GC_API.Models.VacPic;

namespace PTT_GC_API.Data.Interface
{
    public interface VacAndPicInterface
    {
        Task<List<VacListFront>> GetVacAll();
        Task<VacListModel> GetVac(int id);
        Task<VacListFront> GetVacById(int id);
        //Task<int> AddVac(VacListModel entity);
        Task<int> AddVac(VacListFront entity);
        Task<int> UpdateVac(VacListFront entity);
        Task<List<PicListFront>> GetPicAll();
        Task<PicListFront> GetPicById(int id);
        Task<PicListFront> GetPicByInitiativeId(int id);
        Task<int> AddPic(PicListFront entity);
        Task<int> UpdatePic(PicListFront entity);
        Task<VacListFront> GetVacByInitiativeId(int id);

        Task<int> RemoveVacPic(int vacPicId, string type);
        Task<int> OnPICVACSubmit(InitiativeMember entityInitiativeMember);
        Task<List<InitiativeMember>> GetInitiativeMemberList(int id);
    }
}