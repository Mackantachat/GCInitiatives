using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.VacPic;
using PTT_GC_API.Models.VacPic;
using PTT_GC_API.Dtos.Initiative;
using System;

namespace PTT_GC_API.Data.Repository
{
    public class VacAndPicRepository : VacAndPicInterface
    {
        private readonly DataContext _context;
        private readonly InitiativeInterface _initiative_repo;
        public VacAndPicRepository(DataContext context, InitiativeInterface initiative_repo)
        {
            _context = context;
            _initiative_repo = initiative_repo;
        }
        public async Task<List<VacListFront>> GetVacAll()
        {
            var getAllVac = await _context.VacList.OrderByDescending(x => x.VacListId).ToListAsync();
            List<VacListFront> vacLsit = new List<VacListFront>();
            foreach (var item in getAllVac)
            {
                vacLsit.Add(new VacListFront
                {
                    VacListId = item.VacListId,
                    MeetingDate = item.MeetingDate,
                    StatusVac = item.StatusVac,
                    Common = await _context.VacMember.Where(x => x.VacListId == item.VacListId && x.MemberType == "common").Select(x => x.MemberName).ToArrayAsync(),
                    specific = await _context.VacMember.Where(x => x.VacListId == item.VacListId && x.MemberType == "specific").Select(x => x.MemberName).ToArrayAsync(),
                    InitiativeMember = await _context.InitiativeMember.Where(x => x.VacPicId == item.VacListId && x.MemberType == "vac").ToListAsync()
                });
            }
            return vacLsit;
        }
        public async Task<VacListModel> GetVac(int id)
        {
            var _member = await _context.VacMember.ToListAsync();
            if (_member.Count > 0)
            {

                return await _context.VacList.Where(x => x.VacListId == id)
                    .GroupJoin(_member,
                    vac => vac.VacListId,
                    member => member.VacListId,
                    (vac, member) => new VacListModel
                    {
                        VacListId = vac.VacListId,
                        MeetingDate = vac.MeetingDate,
                        VacMember = member.ToList()
                    }).FirstOrDefaultAsync();
            }
            else
            {
                return null;
            }
        }
        public async Task<VacListFront> GetVacById(int id)
        {
            var getVac = await _context.VacList.Where(x => x.VacListId == id).FirstOrDefaultAsync();
            VacListFront vl = new VacListFront()
            {
                VacListId = getVac.VacListId,
                MeetingDate = getVac.MeetingDate,
                StatusVac = getVac.StatusVac,
                Common = await _context.VacMember.Where(x => x.VacListId == getVac.VacListId && x.MemberType == "common").Select(x => x.MemberName).ToArrayAsync(),
                specific = await _context.VacMember.Where(x => x.VacListId == getVac.VacListId && x.MemberType == "specific").Select(x => x.MemberName).ToArrayAsync(),
                InitiativeMember = await _context.InitiativeMember.Where(x => x.VacPicId == getVac.VacListId && x.MemberType == "vac").ToListAsync()
            };
            return vl;
        }

        public async Task<VacListFront> GetVacByInitiativeId(int id)
        {
            var getInitiativeMember = await _context.InitiativeMember.Where(x => x.InitiativeId == id).FirstOrDefaultAsync();
            if (getInitiativeMember == null)
            {
                return new VacListFront();
            }
            var getVac = await _context.VacList.Where(x => x.VacListId == getInitiativeMember.VacPicId).FirstOrDefaultAsync();
            if (getVac == null)
            {
                return new VacListFront();
            }
            VacListFront vl = new VacListFront()
            {
                VacListId = getVac.VacListId,
                MeetingDate = getVac.MeetingDate,
                StatusVac = getVac.StatusVac,
                Common = await _context.VacMember.Where(x => x.VacListId == getVac.VacListId && x.MemberType == "common").Select(x => x.MemberName).ToArrayAsync(),
                specific = await _context.VacMember.Where(x => x.VacListId == getVac.VacListId && x.MemberType == "specific").Select(x => x.MemberName).ToArrayAsync(),
                InitiativeMember = await _context.InitiativeMember.Where(x => x.VacPicId == getVac.VacListId && x.MemberType == "vac").ToListAsync()
            };
            return vl;
        }
        //public async Task<int> AddVac(VacListModel entity)
        //{
        //    _context.Add(entity);
        //    return await _context.SaveChangesAsync();
        //}

        public async Task<int> AddVac(VacListFront entity)
        {
            VacList vm = new VacList();
            vm.VacListId = 0;
            vm.MeetingDate = entity.MeetingDate;
            vm.StatusVac = entity.StatusVac;
            _context.Add(vm);
            var vmm = await _context.SaveChangesAsync();

            var vacId = await _context.VacList.OrderByDescending(i => i.VacListId).Select(i => i.VacListId).FirstOrDefaultAsync();
            foreach (var entityCommon in entity.Common)
            {
                _context.VacMember.Add(new VacMember()
                {
                    VacListId = vacId,
                    MemberName = entityCommon,
                    MemberType = "common"
                });
            }
            foreach (var entityCommon in entity.specific)
            {
                _context.VacMember.Add(new VacMember()
                {
                    VacListId = vacId,
                    MemberName = entityCommon,
                    MemberType = "specific"
                });
            }
            foreach (var entityInitiative in entity.InitiativeMember)
            {
                _context.InitiativeMember.Add(new InitiativeMember()
                {
                    VacPicId = vacId,
                    InitiativeId = entityInitiative.InitiativeId,
                    MemberType = "vac",
                    InitiativeCode = entityInitiative.InitiativeCode,
                    Name = entityInitiative.Name,
                    OwnerName = entityInitiative.OwnerName,
                    InitiativeType = entityInitiative.InitiativeType,
                    Plant = entityInitiative.Plant,
                    EmocNo = entityInitiative.EmocNo,
                    Gate = entityInitiative.Gate,
                    Presentation = entityInitiative.Presentation,
                    Pdd = entityInitiative.Pdd,
                    OverallCostEst = entityInitiative.OverallCostEst,
                    RequestCapex = entityInitiative.RequestCapex,
                    CostEstCapexType = entityInitiative.CostEstCapexType,
                    RequestOpex = entityInitiative.RequestOpex,
                    FxExchange = entityInitiative.FxExchange,
                    CostEstOpexType = entityInitiative.CostEstOpexType,
                    Result = entityInitiative.Result,
                    Process = entityInitiative.Process,
                    Stage = entityInitiative.Stage
                });
            }

            await _context.SaveChangesAsync();


            try
            {
                if (entity.StatusVac == "submit")
                {

                    foreach (var entityInitiativeMember in entity.InitiativeMember)
                    {
                        await OnPICVACSubmit(entityInitiativeMember);
                    }
                }
            }
            catch (Exception ex)
            {

            }


            // _context.Add(entity);
            // return await _context.SaveChangesAsync();
            return vmm;
        }

        public async Task<int> OnPICVACSubmit(InitiativeMember entityInitiativeMember)
        {
            //////////////////////////


            InitiativeSubmitStageStatus initiativeSubmitStageStatus = new InitiativeSubmitStageStatus();
            //InitiativeSubmit initiativeSubmit = new InitiativeSubmit();

            var userAction = await _context.InitiativeActions.Where(i => i.InitiativeId == entityInitiativeMember.InitiativeId && i.Action == "edit" && i.ActionResult == null && (i.IsInactive == null || i.IsInactive == false)).OrderByDescending(i => i.Counter).FirstOrDefaultAsync();

            if (userAction == null) // no action by
                return 0;


            initiativeSubmitStageStatus.Username = userAction.ActionBy;
            //initiativeSubmitStageStatus.UpdatedBy = userAction.ActionBy;
            //initiativeSubmitStageStatus.GoToStage = "";
            //initiativeSubmitStageStatus.SwitchProcessTo = "";

            switch (entityInitiativeMember.Result.ToLower())
            {
                case "pass": 
                    initiativeSubmitStageStatus.Status = "forward";
                    break;
                case "not pass": 
                    initiativeSubmitStageStatus.Status = "backward";
                    break;
                case "leave": 
                    initiativeSubmitStageStatus.Status = "backward";
                    break;
                case "move back": 
                    initiativeSubmitStageStatus.Status = "backward";
                    break;
                case "cancelled": 
                    initiativeSubmitStageStatus.Status = "cancelled";
                    break;
                case "change process":
                    //waiting switch process implemented
                    //initiativeSubmit.Status = "switch process";
                    //initiativeSubmit.SwitchProcessTo = entityInitiativeMember.Process;
                    break;
            }

            if (string.IsNullOrEmpty(initiativeSubmitStageStatus.Status) == true) // no action by
                return 0;

            await _initiative_repo.VACActionSubmit(entityInitiativeMember.InitiativeId, initiativeSubmitStageStatus, entityInitiativeMember.Stage);

            ///////////////////
            return 0;
        }

        public async Task<int> UpdateVac(VacListFront entity)
        {
            VacList vm = new VacList();
            vm.VacListId = entity.VacListId;
            vm.MeetingDate = entity.MeetingDate;
            vm.StatusVac = entity.StatusVac;
            //InitiativeMember InitiativeMember = entity.InitiativeMember;
            _context.Update(vm);
            //var vmm = await _context.SaveChangesAsync();
            var vacId = entity.VacListId;



            var vacMembersRemove = await _context.VacMember.Where(i => i.VacListId == vacId).ToListAsync();
            foreach (var commonEntity in vacMembersRemove)
            {
                _context.VacMember.Remove(commonEntity);
            }


            //remove Only  not Add New
            var initiativeListRemove = await _context.InitiativeMember.Where(i => i.VacPicId == vacId).ToListAsync();
            foreach (var initiativeIdEntity in initiativeListRemove)
            {
                _context.InitiativeMember.Remove(initiativeIdEntity);
            }



            foreach (var entityCommon in entity.Common)
            {
                _context.VacMember.Add(new VacMember()
                {
                    VacListId = vacId,
                    MemberName = entityCommon,
                    MemberType = "common"
                });
            }
            foreach (var entityCommon in entity.specific)
            {
                _context.VacMember.Add(new VacMember()
                {
                    VacListId = vacId,
                    MemberName = entityCommon,
                    MemberType = "specific"
                });
            }

            foreach (var entityInitiative in entity.InitiativeMember)
            {
                _context.InitiativeMember.Add(new InitiativeMember()
                {
                    VacPicId = vacId,
                    InitiativeId = entityInitiative.InitiativeId,
                    MemberType = "vac",
                    InitiativeCode = entityInitiative.InitiativeCode,
                    Name = entityInitiative.Name,
                    OwnerName = entityInitiative.OwnerName,
                    InitiativeType = entityInitiative.InitiativeType,
                    Plant = entityInitiative.Plant,
                    EmocNo = entityInitiative.EmocNo,
                    Gate = entityInitiative.Gate,
                    Presentation = entityInitiative.Presentation,
                    Pdd = entityInitiative.Pdd,
                    OverallCostEst = entityInitiative.OverallCostEst,
                    RequestCapex = entityInitiative.RequestCapex,
                    CostEstCapexType = entityInitiative.CostEstCapexType,
                    RequestOpex = entityInitiative.RequestOpex,
                    FxExchange = entityInitiative.FxExchange,
                    CostEstOpexType = entityInitiative.CostEstOpexType,
                    Result = entityInitiative.Result,
                    Process = entityInitiative.Process,
                    Stage = entityInitiative.Stage
                });
            }

            await _context.SaveChangesAsync();



            try
            {
                if (entity.StatusVac == "submit")
                {

                    foreach (var entityInitiativeMember in entity.InitiativeMember)
                    {
                        await OnPICVACSubmit(entityInitiativeMember);
                    }
                }
            }
            catch (Exception ex)
            {

            }


            return 0;


        }
        public async Task<List<PicListFront>> GetPicAll()
        {
            var getAllPic = await _context.PicList.OrderByDescending(x => x.PicListId).ToListAsync();
            List<PicListFront> picLsit = new List<PicListFront>();
            foreach (var item in getAllPic)
            {
                picLsit.Add(new PicListFront
                {
                    PicListId = item.PicListId,
                    MeetingDate = item.MeetingDate,
                    StatusPic = item.StatusPic,
                    UpStream = await _context.PicMember.Where(x => x.PicListId == item.PicListId && x.MemberType == "upStream").Select(x => x.MemberName).ToArrayAsync(),
                    CenterStream = await _context.PicMember.Where(x => x.PicListId == item.PicListId && x.MemberType == "centerStream").Select(x => x.MemberName).ToArrayAsync(),
                    DownStream = await _context.PicMember.Where(x => x.PicListId == item.PicListId && x.MemberType == "downStream").Select(x => x.MemberName).ToArrayAsync(),
                    InitiativeMember = await _context.InitiativeMember.Where(x => x.VacPicId == item.PicListId && x.MemberType == "pic").ToListAsync()
                });
            }
            return picLsit;
        }
        public async Task<PicListFront> GetPicById(int id)
        {
            var getPic = await _context.PicList.Where(x => x.PicListId == id).FirstOrDefaultAsync();

            PicListFront pl = new PicListFront()
            {
                PicListId = getPic.PicListId,
                MeetingDate = getPic.MeetingDate,
                StatusPic = getPic.StatusPic,
                UpStream = await _context.PicMember.Where(x => x.PicListId == getPic.PicListId && x.MemberType == "upStream").Select(x => x.MemberName).ToArrayAsync(),
                CenterStream = await _context.PicMember.Where(x => x.PicListId == getPic.PicListId && x.MemberType == "centerStream").Select(x => x.MemberName).ToArrayAsync(),
                DownStream = await _context.PicMember.Where(x => x.PicListId == getPic.PicListId && x.MemberType == "downStream").Select(x => x.MemberName).ToArrayAsync(),
                InitiativeMember = await _context.InitiativeMember.Where(x => x.VacPicId == getPic.PicListId && x.MemberType == "pic").ToListAsync()
            };

            return pl;
        }

        public async Task<PicListFront> GetPicByInitiativeId(int id)
        {
            var initiativeMember = await _context.InitiativeMember.Where(x => x.InitiativeId == id).FirstOrDefaultAsync();
            if (initiativeMember == null)
            {
                return new PicListFront();
            }
            var getPic = await _context.PicList.Where(x => x.PicListId == initiativeMember.VacPicId).FirstOrDefaultAsync();
            if (getPic == null)
            {
                return new PicListFront();
            }
            var UpStream = await _context.PicMember.Where(x => x.PicListId == getPic.PicListId && x.MemberType == "upStream").ToListAsync();
            PicListFront pl = new PicListFront()
            {
                PicListId = getPic.PicListId,
                MeetingDate = getPic.MeetingDate,
                StatusPic = getPic.StatusPic,
                UpStream = await _context.PicMember.Where(x => x.PicListId == initiativeMember.VacPicId && x.MemberType == "upStream").Select(x => x.MemberName).ToArrayAsync(),
                CenterStream = await _context.PicMember.Where(x => x.PicListId == initiativeMember.VacPicId && x.MemberType == "centerStream").Select(x => x.MemberName).ToArrayAsync(),
                DownStream = await _context.PicMember.Where(x => x.PicListId == initiativeMember.VacPicId && x.MemberType == "downStream").Select(x => x.MemberName).ToArrayAsync(),
                InitiativeMember = await _context.InitiativeMember.Where(x => x.VacPicId == getPic.PicListId && x.MemberType == "pic").ToListAsync()
            };

            return pl;
        }

        public async Task<int> AddPic(PicListFront entity)
        {
            PicList pic = new PicList();
            pic.PicListId = 0;
            pic.MeetingDate = entity.MeetingDate;
            pic.StatusPic = entity.StatusPic;
            _context.Add(pic);
            var picm = await _context.SaveChangesAsync();

            var picId = await _context.PicList.OrderByDescending(i => i.PicListId).Select(i => i.PicListId).FirstOrDefaultAsync();
            foreach (var entityUpStream in entity.UpStream)
            {
                _context.PicMember.Add(new PicMember()
                {
                    PicListId = picId,
                    MemberName = entityUpStream,
                    MemberType = "upStream"
                });
            }
            foreach (var entityCemterStream in entity.CenterStream)
            {
                _context.PicMember.Add(new PicMember()
                {
                    PicListId = picId,
                    MemberName = entityCemterStream,
                    MemberType = "centerStream"
                });
            }

            foreach (var entityDownStream in entity.DownStream)
            {
                _context.PicMember.Add(new PicMember()
                {
                    PicListId = picId,
                    MemberName = entityDownStream,
                    MemberType = "downStream"
                });
            }
            foreach (var entityInitiative in entity.InitiativeMember)
            {
                _context.InitiativeMember.Add(new InitiativeMember()
                {
                    VacPicId = picId,
                    InitiativeId = entityInitiative.InitiativeId,
                    MemberType = "pic",
                    InitiativeCode = entityInitiative.InitiativeCode,
                    Name = entityInitiative.Name,
                    OwnerName = entityInitiative.OwnerName,
                    InitiativeType = entityInitiative.InitiativeType,
                    Plant = entityInitiative.Plant,
                    EmocNo = entityInitiative.EmocNo,
                    Gate = entityInitiative.Gate,
                    Presentation = entityInitiative.Presentation,
                    Pdd = entityInitiative.Pdd,
                    OverallCostEst = entityInitiative.OverallCostEst,
                    RequestCapex = entityInitiative.RequestCapex,
                    CostEstCapexType = entityInitiative.CostEstCapexType,
                    RequestOpex = entityInitiative.RequestOpex,
                    FxExchange = entityInitiative.FxExchange,
                    CostEstOpexType = entityInitiative.CostEstOpexType,
                    Result = entityInitiative.Result,
                    Process = entityInitiative.Process,
                    Stage = entityInitiative.Stage
                });
            }

            await _context.SaveChangesAsync();


            try
            {
                if (entity.StatusPic == "submit")
                {

                    foreach (var entityInitiativeMember in entity.InitiativeMember)
                    {
                        await OnPICVACSubmit(entityInitiativeMember);
                    }
                }
            }
            catch (Exception ex)
            {

            }


            // _context.Add(entity);
            // return await _context.SaveChangesAsync();
            return picm;
        }
        public async Task<int> UpdatePic(PicListFront entity)
        {
            PicList pic = new PicList();
            pic.PicListId = entity.PicListId;
            pic.MeetingDate = entity.MeetingDate;
            pic.StatusPic = entity.StatusPic;
            _context.Update(pic);
            var picId = entity.PicListId;


            var picMembersRemove = await _context.PicMember.Where(i => i.PicListId == picId).ToListAsync();
            foreach (var dataEntity in picMembersRemove)
            {
                _context.PicMember.Remove(dataEntity);
            }



            //remove all
            var initiativeListRemove = await _context.InitiativeMember.Where(i => i.VacPicId == picId).ToListAsync();
            foreach (var initiativeIdEntity in initiativeListRemove)
            {
                _context.InitiativeMember.Remove(initiativeIdEntity);
            }



            foreach (var entityUpStream in entity.UpStream)
            {
                _context.PicMember.Add(new PicMember()
                {
                    PicListId = picId,
                    MemberName = entityUpStream,
                    MemberType = "upStream"
                });
            }
            foreach (var entityCemterStream in entity.CenterStream)
            {
                _context.PicMember.Add(new PicMember()
                {
                    PicListId = picId,
                    MemberName = entityCemterStream,
                    MemberType = "centerStream"
                });
            }

            foreach (var entityDownStream in entity.DownStream)
            {
                _context.PicMember.Add(new PicMember()
                {
                    PicListId = picId,
                    MemberName = entityDownStream,
                    MemberType = "downStream"
                });
            }

            foreach (var entityInitiative in entity.InitiativeMember)
            {
                _context.InitiativeMember.Add(new InitiativeMember()
                {
                    VacPicId = picId,
                    InitiativeId = entityInitiative.InitiativeId,
                    MemberType = "pic",
                    InitiativeCode = entityInitiative.InitiativeCode,
                    Name = entityInitiative.Name,
                    OwnerName = entityInitiative.OwnerName,
                    InitiativeType = entityInitiative.InitiativeType,
                    Plant = entityInitiative.Plant,
                    EmocNo = entityInitiative.EmocNo,
                    Gate = entityInitiative.Gate,
                    Presentation = entityInitiative.Presentation,
                    Pdd = entityInitiative.Pdd,
                    OverallCostEst = entityInitiative.OverallCostEst,
                    RequestCapex = entityInitiative.RequestCapex,
                    CostEstCapexType = entityInitiative.CostEstCapexType,
                    RequestOpex = entityInitiative.RequestOpex,
                    FxExchange = entityInitiative.FxExchange,
                    CostEstOpexType = entityInitiative.CostEstOpexType,
                    Result = entityInitiative.Result,
                    Process = entityInitiative.Process,
                    Stage = entityInitiative.Stage
                });
            }

            await _context.SaveChangesAsync();


            try
            {
                if (entity.StatusPic == "submit")
                {

                    foreach (var entityInitiativeMember in entity.InitiativeMember)
                    {
                        await OnPICVACSubmit(entityInitiativeMember);
                    }
                }
            }
            catch (Exception ex)
            {

            }

            return 0;

        }

        public async Task<int> RemoveVacPic(int vacPicId, string type)
        {
            switch (type)
            {
                case "vac":
                    var vacUpdate = _context.VacList.Where(v => v.VacListId == vacPicId).FirstOrDefault();
                    if (vacUpdate != null)
                    {
                        vacUpdate.StatusVac = "remove";
                    }

                    break;
                case "pic":
                    var picUpdate = _context.PicList.Where(v => v.PicListId == vacPicId).FirstOrDefault();
                    if (picUpdate != null)
                    {
                        picUpdate.StatusPic = "remove";
                    }
                    break;
            }
            return await _context.SaveChangesAsync();
        }
        public async Task<List<InitiativeMember>> GetInitiativeMemberList(int id)
        {
            List<InitiativeMember> initiativeMembers = new List<InitiativeMember>();
            try
            {
                initiativeMembers = await _context.InitiativeMember.Where(x => x.InitiativeId == id).ToListAsync();
                return initiativeMembers;
            }
            catch (Exception ex)
            {
                return initiativeMembers;
            }
        }
    }
}
