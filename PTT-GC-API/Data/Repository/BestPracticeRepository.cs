using AutoMapper;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.BestPractice;
using PTT_GC_API.Models.BestPractice;
using PTT_GC_API.Models.Plant;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Security;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class BestPracticeRepository : IBestPracticeRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public BestPracticeRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public bool DeleteBestPracticeModel(int initiativeId)
        {
            var removeBestPractice = _context.BestPractices.FirstOrDefault(x => x.InitiativeId == initiativeId);
            var removeContact = _context.Contact.Where(x => x.InitiativeId == initiativeId).ToList();
            var removeProjectRef = _context.ProjectReference.Where(x => x.InitiativeId == initiativeId).ToList();
            var removeMilestone = _context.Milestones.Where(x => x.InitiativeId == initiativeId).ToList();
            _context.BestPractices.RemoveRange(removeBestPractice);
            _context.Contact.RemoveRange(removeContact);
            _context.ProjectReference.RemoveRange(removeProjectRef);
            _context.Milestones.RemoveRange(removeMilestone);
            _context.SaveChanges();

            return true;
        }

        public BestPracticeModelData GetBestPractice(int initiativeID)
        {
            var bestPractice = _context.BestPractices.FirstOrDefault(x => x.InitiativeId == initiativeID);
            if (bestPractice != null)
            {
                var modelData = _mapper.Map<BestPracticeModelData>(bestPractice);
                var knowledge = _context.BestPracticeKnowledgeContributors.Where(x => x.InitiativeId == initiativeID).Select(x => x.KnowledgeContributor).ToList();
                modelData.KnowledgeContributor = knowledge;
                modelData.ContactModel = _context.Contact.Where(x => x.InitiativeId == initiativeID).ToList();
                modelData.ProjectReferenceModel = _context.ProjectReference.Where(x => x.InitiativeId == initiativeID).ToList();
                modelData.MileStoneModel = _context.Milestones.Where(x => x.InitiativeId == initiativeID).ToList();
                return modelData;
            }
            return null;
        }

        public bool InsertBestPractice(BestPracticeModelData model)
        {
            var bestPractice = _mapper.Map<BestPracticeModel>(model);
            bestPractice.Id = 0;

            var knowledgeContributor = new List<KnowledgeContributorModel>();
            if (model.KnowledgeContributor != null)
            {
                foreach (var item in model.KnowledgeContributor)
                {
                    knowledgeContributor.Add(new KnowledgeContributorModel
                    {
                        Id = 0,
                        InitiativeId = model.InitiativeId,
                        KnowledgeContributor = item
                    });
                }
            }

            // Insert BestPractice 
            _context.BestPractices.Add(bestPractice);

            // Insert Contact
            if (model.ContactModel != null)
            {
                foreach (var item in model.ContactModel)
                {
                    item.Id = 0;
                    _context.Contact.Add(item);
                }
            }

            // Insert Project reference
            if (model.ProjectReferenceModel != null)
            {
                foreach (var item in model.ProjectReferenceModel)
                {
                    item.Id = 0;
                    _context.ProjectReference.Add(item);
                }
            }
            // Insert Milestone
            if (model.MileStoneModel != null)
            {
                foreach (var item in model.MileStoneModel)
                {
                    item.Id = 0;
                    _context.Milestones.Add(item);
                }
            }

            _context.SaveChanges();
            return true;
        }

        // If there's Exception: 'Database operation expected to affect x row(s) but actually affected y row(s)
        // Please Make sure that new data that will be insert has Id = 0
        public bool UpdateBestPractice(BestPracticeModelData model)
        {
            var bestPractice = _mapper.Map<BestPracticeModel>(model);
            _context.BestPractices.Update(bestPractice);

            // Map knowledge contributor
            var knowledge = _context.BestPracticeKnowledgeContributors.Where(x => x.InitiativeId == model.InitiativeId).ToList();
            var plantExisted = _context.BestPracticePlants.Where(x => x.InitiativeId == model.InitiativeId).ToList();
            var knowledgeContributor = new List<KnowledgeContributorModel>();
            var contactObj = new List<Contact>();
            var projectReferenceObj = new List<ProjectReferenceModel>();
            if (model.ContactModel != null)
            {
                if (model.ContactModel.Count > 0)
                {
                    foreach (var item in model.ContactModel)
                    {
                        contactObj.Add(new Contact
                        {
                            InitiativeId = model.InitiativeId,
                            Name = item.Name,
                            Phone = item.Phone,
                            Email = item.Email
                        });
                    }
                }
            }

            if (model.ProjectReferenceModel != null) {
                if (model.ProjectReferenceModel.Count > 0)
                {
                    foreach (var item in model.ProjectReferenceModel)
                    {
                        projectReferenceObj.Add(new ProjectReferenceModel
                        {
                            InitiativeId = model.InitiativeId,
                            ProjectReference = item.ProjectReference
                        });
                    }
                }
            }
            if (model.KnowledgeContributor != null)
            {
                if (model.KnowledgeContributor.Count > 0)
                {
                    foreach (var item in model.KnowledgeContributor)
                    {
                        knowledgeContributor.Add(new KnowledgeContributorModel
                        {
                            InitiativeId = model.InitiativeId,
                            KnowledgeContributor = item
                        });
                    }
                }
            }

     



            //Update Contact
           
                var contact = _context.Contact.Where(x => x.InitiativeId == model.InitiativeId).ToList();
                if (contact.Count == 0)
                {
                foreach (var item in contactObj)
                {
                    item.Id = 0;
                }
                _context.Contact.UpdateRange(contactObj);
                    _context.SaveChanges();
                }
                else
                {
                    foreach (var item in contact)
                    {
                        if (!contactObj.Contains(item))
                        {
                            _context.Contact.Remove(item);
                        }
                    }
                    _context.Contact.UpdateRange(contactObj);
                    _context.SaveChanges();
                }

            //Update Knowledge Contributors

            if (knowledge.Count == 0)
            {
                _context.BestPracticeKnowledgeContributors.UpdateRange(knowledgeContributor);
                _context.SaveChanges();
            }
            else
            {
                foreach (var item in knowledge)
                {
                    if (!knowledgeContributor.Contains(item))
                    {
                        _context.BestPracticeKnowledgeContributors.Remove(item);
                    }
                }
                _context.BestPracticeKnowledgeContributors.UpdateRange(knowledgeContributor);
                _context.SaveChanges();
            }


            // Update Project Reference
            var projectReference = _context.ProjectReference.Where(x => x.InitiativeId == model.InitiativeId).ToList();

                if (projectReference.Count == 0)
                {
                    foreach (var item in projectReferenceObj)
                    {
                        item.Id = 0;
                    }
                    _context.ProjectReference.UpdateRange(projectReferenceObj);
                    _context.SaveChanges();
                }
                else
                {
                    foreach (var item in projectReference)
                    {
                        if (!projectReferenceObj.Contains(item))
                        {
                            _context.ProjectReference.Remove(item);
                        }
                    }
                    _context.ProjectReference.UpdateRange(projectReferenceObj);
                    _context.SaveChanges();
                }
            return true;
        }

        // If there's Exception: 'Database operation expected to affect x row(s) but actually affected y row(s)
        // Please Make sure that new data that will be insert has Id = 0
        //public bool testNewUpdate(BestPracticeModelData model)
        //{
        //    var contact = _context.Contact.Where(x => x.InitiativeId == model.InitiativeId).ToList();
        //    if(contact.Count == 0)
        //    {
        //        foreach(var item in model.ContactModel)
        //        {
        //            item.Id = 0;
        //        }
        //        _context.Contact.UpdateRange(model.ContactModel);
        //        _context.SaveChanges();
        //        return true;
        //    }
        //    foreach(var item in contact)
        //    {
        //        if (!model.ContactModel.Contains(item))
        //        {
        //            _context.Contact.Remove(item);
        //        }
        //    }
        //    _context.Contact.UpdateRange(model.ContactModel);
        //    _context.SaveChanges();

        //    return true;
        //}


        public bool RemoveContactById(int id)
        {
            var removeContact = _context.Contact.FirstOrDefault(x => x.Id == id);
            _context.Remove(removeContact);
            _context.SaveChanges();

            return true;
        }

        public bool RemoveProjectReferenceById(int id)
        {
            var removeProjectReference = _context.ProjectReference.FirstOrDefault(x => x.Id == id);
            _context.Remove(removeProjectReference);
            _context.SaveChanges();

            return true;
        }
    }
}
