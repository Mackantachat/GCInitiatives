using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Dtos.Initiative;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SuggestController : Controller
    {

        [HttpPost("Calculate")]
        public IActionResult Calculate(Suggestion suggestion)
        {
            try
            {
                string suggestionResult = "No case";
                if (suggestion.TypeOfInvestment != null || suggestion.TypeOfInvestment != String.Empty)
                {

                    switch (suggestion.TypeOfInvestment)
                    {
                        case "M&A":

                            suggestionResult = "CIM";

                            break;

                        case "CVC":

                            if (suggestion.CostEstCapex > 15)
                            {
                                suggestionResult = "CIM";
                            }
                            else
                            {
                                suggestionResult = "No case";
                            }

                            break;

                        //case "Growth":
                        //case "Sustain":
                        case "Growth: Backbone":
                        case "Growth: Build International Competitive base":
                        case "Growth: Diversify to performance chemicals":
                        case "Growth: Enhance green":
                        case "Growth: New business":

                        case "Sustain Core: Chain Integration":
                        case "Sustain Core: Debot/Expansion":

                        case "Sustain Core: Energy saving": // มีเงื่อนไขเพิ่ม

                        case "Sustain Core: Map ta put retrofit":
                        case "Sustain Core: Marketing Excellence":
                        case "Sustain Core: New derivative":
                        case "Sustain Core: Operational Excellence":
                        case "Sustain Core: Synergy":

                            if (suggestion.CostEstCapex > 300)
                            {
                                suggestionResult = "CIM";
                            }
                            else if (suggestion.InvolveItDigital && MAX_critriria_function(suggestion))
                            {
                                suggestionResult = "DIM_MAX";

                            }
                            else if (suggestion.InvolveItDigital && !MAX_critriria_function(suggestion))
                            {
                                suggestionResult = "DIM";
                            }
                            else if (suggestion.BudgetSource == "ER")
                            {
                                suggestionResult = "ER_Approve";
                            }
                            else if (suggestion.Irr == 0)
                            {
                                suggestionResult = "No case";
                            }
                            else if (suggestion.Irr != 0 && !MAX_critriria_function(suggestion))
                            {
                                suggestionResult = "PIM";
                            }
                            else if (suggestion.Irr != 0 && MAX_critriria_function(suggestion) && !Max_Pool_capex_function())
                            {
                                suggestionResult = "PIM_MAX";
                            }
                            else
                            {
                                suggestionResult = "CIM";
                            }

                            break;
                        case "Maintain Reliability":

                            if (suggestion.CostEstCapex > 300)
                            {
                                if (suggestion.Irr == 0)
                                {
                                    suggestionResult = "No case";
                                }
                                else
                                {
                                    suggestionResult = "PIM";
                                }
                            }
                            else if (suggestion.InvolveItDigital && MAX_critriria_function(suggestion))
                            {
                                suggestionResult = "DIM_MAX";
                            }
                            else if (suggestion.InvolveItDigital && !MAX_critriria_function(suggestion))
                            {
                                suggestionResult = "DIM";

                            }
                            else if (suggestion.BudgetSource == "ER")
                            {
                                suggestionResult = "ER_Approve";
                            }
                            else if (suggestion.Irr == 0)
                            {
                                suggestionResult = "No_case";
                            }
                            else if (suggestion.Irr != 0 && !MAX_critriria_function(suggestion))
                            {
                                suggestionResult = "PIM";
                            }
                            else if (suggestion.Irr != 0 && MAX_critriria_function(suggestion) && !Max_Pool_capex_function())
                            {
                                suggestionResult = "PIM_MAX";
                            }
                            else if (suggestion.Irr != 0 && MAX_critriria_function(suggestion) && Max_Pool_capex_function())
                            {
                                suggestionResult = "MAX";
                            }
                            break;
                        case "Replacement":
                        case "Turnaround":
                        case "Overhaul":
                        case "CSR":
                        case "R&D":
                        case "Welfare":
                        case "Lab & Quality":
                        case "Technical Support for R&D":
                        case "Others":

                            if (suggestion.CostEstCapex > 300)
                            {
                                suggestionResult = "CAPEX";

                            }
                            else if (suggestion.InvolveItDigital && MAX_critriria_function(suggestion))
                            {
                                suggestionResult = "DIM_MAX";
                            }
                            else if (suggestion.InvolveItDigital && !MAX_critriria_function(suggestion))
                            {
                                suggestionResult = "DIM";
                            }
                            else if (!MAX_critriria_function(suggestion))
                            {
                                suggestionResult = "CAPEX";
                            }
                            else if (Max_Pool_capex_function())
                            {
                                suggestionResult = "MAX";
                            }
                            else
                            {
                                suggestionResult = "CAPEX_MAX";
                            }
                            break;

                        case "Digital Capex":
                        case "IT Capex":

                            if (suggestion.CostEstCapex > 300)
                            {
                                suggestionResult = "CIM";
                            }
                            else if (MAX_critriria_function(suggestion))
                            {
                                suggestionResult = "DIM_MAX";
                            }
                            else
                            {
                                suggestionResult = "DIM";
                            }
                            break;

                        case "Environment":
                        case "Safety":
                        case "Law & Regulation":

                            if (suggestion.InvolveItDigital && MAX_critriria_function(suggestion))
                            {
                                suggestionResult = "DIM_MAX";
                            }
                            else if (suggestion.BudgetSource == "ER")
                            {
                                suggestionResult = "ER_Approve";
                            }
                            else if (suggestion.Ram == String.Empty)
                            {
                                suggestionResult = "No_case";
                            }
                            else if (suggestion.JFactor == 0 || suggestion.JFactor == null)
                            {
                                suggestionResult = "No_case";
                            }
                            break;

                        default:
                            suggestionResult = "No_case";
                            break;

                    }
                }
                return Ok(new { Suggestion = suggestionResult });
            }
            catch (Exception exc)
            {
                throw exc;
            }
        }

        public bool MAX_critriria_function(Suggestion suggestion)
        {
            if(suggestion.CostEstCapex <= 300 && suggestion.TypeBenefit != "NON-FINANCIAL" && suggestion.PayBackPeriod <= 3)
            {
                return true;
            }
            return false;
        }
        
        public bool Max_Pool_capex_function()
        {
            return false;
        }

        /// PIM CASE ///
        [HttpPost("PIM")]
        public bool PIM(Suggestion suggestion)
        {
            //main condition
            string[] typeOfInvestment = { 
            "Environment", 
            "Safety", 
            "Law & Regulation", 
            "Maintain Reliability", };
            string[] ram = { "Very low", "Low", "Medium", "High" };
            
            if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
            
            if (!suggestion.RequestCapex) { return false; }
            
            if (suggestion.InvolveItDigital) { return false; }
            
            if (suggestion.BudgetSource == "ER") { return false; }
            
            if (!ram.Contains(suggestion.Ram)) { return false; }
            
            if (suggestion.JFactor <= 0.2 || suggestion.JFactor == null) { return false; }

            if (suggestion.CostEstCapex <= 300 || suggestion.CostEstCapex == null) { return false; }

            if (suggestion.Irr < 15 || suggestion.Irr == null) { return false; }

            if (suggestion.TypeBenefit != "NON-FINANCIAL") { return false; }

            if (suggestion.PayBackPeriod <= 3 || suggestion.PayBackPeriod == null) { return false; }



            //เริ่มขัดแย้ง
            //group 1
            string[] TypeOfInvestment_growth = {


            "Growth: Backbone",
            "Growth: New business",
            "Growth: Build International Competitive base",
            "Growth: Diversify to performance chemicals",
            "Growth: Enhance green",


            "Sustain Core: Synergy",
            "Sustain Core: Operational Excellence",
            "Sustain Core: Marketing Excellence",
            "Sustain Core: Debot/Expansion",
            "Sustain Core: Chain Integration",
            "Sustain Core: New derivative",
            "Sustain Core: Map ta put retrofit"
            };
            if (!TypeOfInvestment_growth.Contains(suggestion.TypeOfInvestment)) return false;
            if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }

            //group 2
            if (suggestion.TypeOfInvestment != "Maintain Reliability") { return false; }
            if (suggestion.Irr >= 15 || suggestion.Irr == null) { return false; }

            //group 3
            if (suggestion.JFactor > 0.2 || suggestion.JFactor == null) { return false; }



            //ต้องคิดเพิ่ม
            //group 1
            if (suggestion.TypeOfInvestment != "Sustain Core: Energy saving") { return false; }
            if (suggestion.Irr < 8.53 || suggestion.Irr == null) { return false; }

            //group2

            return true;
        }
        
        
        //[HttpPost("PIM_RAM_FACTOR")]
        //public bool PIM_RAM_FACTOR(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = { "Environment", "Safety", "Law & Regulation" };
        //    string[] ram = { "Medium", "High" };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource == "ER") { return false; }
        //    if (!ram.Contains(suggestion.Ram)) { return false; }
        //    if (suggestion.JFactor <= 0.2 || suggestion.JFactor == null) { return false; }
        //    return true;
        //}

        //[HttpPost("PIM_Maintain")]
        //public bool PIM_Maintain(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Maintain Reliability") { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource == "ER") { return false; }
            
        //    return true;
        //}

        //[HttpPost("PIM_Maintain_Criteria")]
        //public bool PIM_Maintain_Criteria(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Maintain Reliability") { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource == "ER") { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr < 15 || suggestion.Irr == null) { return false; }
        //    return true;
        //}

        //[HttpPost("PIM_Maintain_Criteria_TypeBenefit")]
        //public bool PIM_Maintain_Criteria_TypeBenefit(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Maintain Reliability") { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource == "ER") { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr < 15 || suggestion.Irr == null) { return false; }
        //    if (suggestion.TypeBenefit != "NON-FINANCIAL") { return false; }
        //    return true;
        //}

        //[HttpPost("PIM_Maintain_Criteria_PayBackPeriod")]
        //public bool PIM_Maintain_Criteria_PayBackPeriod(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Maintain Reliability") { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource == "ER") { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr < 15 || suggestion.Irr == null) { return false; }
        //    return true;
        //}

        //[HttpPost("PIM_Growth_Criteria")]
        //public bool PIM_Growth_Criteria(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "Growth: Backbone",
        //    "Growth: New business",
        //    "Growth: Build International Competitive base",
        //    "Growth: Diversify to performance chemicals",
        //    "Growth: Enhance green"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource == "ER") { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr < 15 || suggestion.Irr == null) { return false; }
        //    return true;
        //}

        //[HttpPost("PIM_Growth_Criteria_TypeBenefit")]
        //public bool PIM_Growth_Criteria_TypeBenefit(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "Growth: Backbone",
        //    "Growth: New business",
        //    "Growth: Build International Competitive base",
        //    "Growth: Diversify to performance chemicals",
        //    "Growth: Enhance green"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource == "ER") { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr < 15 || suggestion.Irr == null) { return false; }
        //    if (suggestion.TypeBenefit != "NON-FINANCIAL") { return false; }
        //    return true;
        //}

        //[HttpPost("PIM_Growth_Criteria_PayBackPeriod")]
        //public bool PIM_Growth_Criteria_PayBackPeriod(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "Growth: Backbone",
        //    "Growth: New business",
        //    "Growth: Build International Competitive base",
        //    "Growth: Diversify to performance chemicals",
        //    "Growth: Enhance green"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource == "ER") { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr < 15 || suggestion.Irr == null) { return false; }
        //    if (suggestion.PayBackPeriod <= 3 || suggestion.PayBackPeriod == null) { return false; }
        //    return true;
        //}

        //[HttpPost("PIM_SustainCore_Criteria")]
        //public bool PIM_SustainCore_Criteria(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
            
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource == "ER") { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr < 15 || suggestion.Irr == null) { return false; }
        //    return true;
        //}

        //[HttpPost("PIM_SustainCore_Criteria_TypeBenefit")]
        //public bool PIM_SustainCore_Criteria_TypeBenefit(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "Sustain Core: Synergy",
        //    "Sustain Core: Operational Excellence",
        //    "Sustain Core: Marketing Excellence",
        //    "Sustain Core: Debot/Expansion",
        //    "Sustain Core: Chain Integration",
        //    "Sustain Core: New derivative",
        //    "Sustain Core: Map ta put retrofit"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource == "ER") { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr < 15 || suggestion.Irr == null) { return false; }
        //    if (suggestion.TypeBenefit != "NON-FINANCIAL") { return false; }
        //    return true;
        //}

        //[HttpPost("PIM_SustainCore_Criteria_PayBackPeriod")]
        //public bool PIM_SustainCore_Criteria_PayBackPeriod(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "Sustain Core: Synergy",
        //    "Sustain Core: Operational Excellence",
        //    "Sustain Core: Marketing Excellence",
        //    "Sustain Core: Debot/Expansion",
        //    "Sustain Core: Chain Integration",
        //    "Sustain Core: New derivative",
        //    "Sustain Core: Map ta put retrofit"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource == "ER") { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr < 15 || suggestion.Irr == null) { return false; }
        //    if (suggestion.PayBackPeriod <= 3 || suggestion.PayBackPeriod == null) { return false; }
        //    return true;
        //}

        //[HttpPost("PIM_SustainCore_EnergySaving_Criteria")]
        //public bool PIM_SustainCore_EnergySaving_Criteria(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Sustain Core: Energy saving") { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource == "ER") { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr < 8.53 || suggestion.Irr == null) { return false; }
        //    return true;
        //}

        //[HttpPost("PIM_SustainCore_EnergySaving_Criteria_TypeBenefit")]
        //public bool PIM_SustainCore_EnergySaving_Criteria_TypeBenefit(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Sustain Core: Energy saving") { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource == "ER") { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr < 8.53 || suggestion.Irr == null) { return false; }
        //    if (suggestion.TypeBenefit != "NON-FINANCIAL") { return false; }
        //    return true;
        //}

        //[HttpPost("PIM_SustainCore_EnergySaving_Criteria_PayBackPeriod")]
        //public bool PIM_SustainCore_EnergySaving_Criteria_PayBackPeriod(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Sustain Core: Energy saving") { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource == "ER") { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr < 8.53 || suggestion.Irr == null) { return false; }
        //    if (suggestion.PayBackPeriod <= 3 || suggestion.PayBackPeriod == null) { return false; }
        //    return true;
        //}

        //[HttpPost("PIM_Maintain_NoCase")]
        //public bool PIM_Maintain_NoCase(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Maintain Reliability") { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource == "ER") { return false; }
        //    if (suggestion.CostEstCapex <= 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr >= 15 || suggestion.Irr == null) { return false; }
        //    return true;
        //}

        //[HttpPost("PIM_RAM_FACTOR_JFactor_NoCase")]
        //public bool PIM_RAM_FACTOR_JFactor_NoCase(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = { "Environment", "Safety", "Law & Regulation" };
        //    string[] ram = { "Medium", "High" };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource == "ER") { return false; }
        //    if (!ram.Contains(suggestion.Ram)) { return false; }
        //    if (suggestion.JFactor > 0.2 || suggestion.JFactor == null) { return false; }
        //    return true;
        //}

        //[HttpPost("PIM_RAM_FACTOR_RAM_NoCase")]
        //public bool PIM_RAM_FACTOR_RAM_NoCase(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = { "Environment", "Safety", "Law & Regulation" };
        //    string[] ram = { "Very low", "Low" };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource == "ER") { return false; }
        //    if (!ram.Contains(suggestion.Ram)) { return false; }
        //    return true;
        //}

        ///

        // DIM CASE

        [HttpPost("DIM")]
        public bool DIM(Suggestion suggestion)
        {
            //main condition
            string[] typeOfInvestment = {
                "Environment", 
                "Safety", 
                "Law & Regulation", 
                "Maintain Reliability",
                "IT CAPEX",
                "Digital CAPEX",
                "Turnaround",
                "Overhaul",
                "CSR",
                "Welfare",
                "Lab & Quality",
                "Technical Support for R&D",
                "R&D",
                "Others",

                "Growth: Backbone",
                "Growth: New business",
                "Growth: Build International Competitive base",
                "Growth: Diversify to performance chemicals",
                "Growth: Enhance green",

                "Sustain Core: Synergy",
                "Sustain Core: Operational Excellence",
                "Sustain Core: Marketing Excellence",
                "Sustain Core: Debot/Expansion",
                "Sustain Core: Chain Integration",
                "Sustain Core: New derivative",
                "Sustain Core: Map ta put retrofit",
                "Sustain Core: Energy saving"
            };
            if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
            if (!suggestion.RequestCapex) { return false; }
            if (!suggestion.InvolveItDigital) { return false; }
            if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
            if (suggestion.Irr < 15 || suggestion.Irr == null) { return false; }
            if (suggestion.TypeBenefit == "NON-FINANCIAL") { return false; }
            if (suggestion.PayBackPeriod <= 3 || suggestion.PayBackPeriod == null) { return false; }

            //conflict
            //group 1
            //"Maintain Reliability"
            //"Growth: Backbone",
            //"Growth: New business",
            //"Growth: Build International Competitive base",
            //"Growth: Diversify to performance chemicals",
            //"Growth: Enhance green",
            //"Sustain Core: Synergy",
            //"Sustain Core: Operational Excellence",
            //"Sustain Core: Marketing Excellence",
            //"Sustain Core: Debot/Expansion",
            //"Sustain Core: Chain Integration",
            //"Sustain Core: New derivative",
            //"Sustain Core: Map ta put retrofit",
            //"Sustain Core: Energy saving"

            if (suggestion.PayBackPeriod > 3 || suggestion.PayBackPeriod == null) { return false; }

            //group 2
            //"Turnaround",
            //"Overhaul",
            //"CSR",
            //"Welfare",
            //"Lab & Quality",
            //"Technical Support for R&D",
            //"R&D",
            //"Others"

            //"Growth: Backbone",
            //"Growth: New business",
            //"Growth: Build International Competitive base",
            //"Growth: Diversify to performance chemicals",
            //"Growth: Enhance green",

            //"Sustain Core: Synergy",
            //"Sustain Core: Operational Excellence",
            //"Sustain Core: Marketing Excellence",
            //"Sustain Core: Debot/Expansion",
            //"Sustain Core: Chain Integration",
            //"Sustain Core: New derivative",
            //"Sustain Core: Map ta put retrofit",
            //"Sustain Core: Energy saving"
            if (suggestion.TypeOfInvestment != "IT CAPEX" && suggestion.TypeOfInvestment != "Digital CAPEX") { return false; }
            if (suggestion.TypeBenefit != "NON-FINANCIAL") { return false; }




            //addition
            //group 1




            //cross -> MAX
            //group 1

            //"Turnaround",
            //"Overhaul",
            //"CSR",
            //"Welfare",
            //"Lab & Quality",
            //"Technical Support for R&D",
            //"R&D",
            //"Others"
            if (suggestion.PayBackPeriod > 3 || suggestion.PayBackPeriod == null) { return false; }




            return true;
        }
        
        
        //[HttpPost("DIM_Environment")]
        //public bool DIM_Environment(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = { "Environment", "Safety", "Law & Regulation" };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (!suggestion.InvolveItDigital) { return false; }
        //    return true;
        //}

        

        //[HttpPost("DIM_Maintain")]
        //public bool DIM_Maintain(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Maintain Reliability") { return false; }
        //    if (!suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr < 15 || suggestion.Irr == null) { return false; }
        //    if (suggestion.TypeBenefit == "NON-FINANCIAL") { return false; }
        //    if (suggestion.PayBackPeriod <= 3 || suggestion.PayBackPeriod == null) { return false; }
        //    return true;
        //}

        //[HttpPost("DIM_NON_Maintain")]
        //public bool DIM_NON_Maintain(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Maintain Reliability") { return false; }
        //    if (!suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr < 15 || suggestion.Irr == null) { return false; }
        //    if (suggestion.TypeBenefit != "NON-FINANCIAL") { return false; }
        //    return true;
        //}

        //[HttpPost("DIM_MAX_Maintain")]
        //public bool DIM_MAX_Maintain(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Maintain Reliability") { return false; }
        //    if (!suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr < 15 || suggestion.Irr == null) { return false; }
        //    if (suggestion.TypeBenefit == "NON-FINANCIAL") { return false; }
        //    if (suggestion.PayBackPeriod > 3 || suggestion.PayBackPeriod == null) { return false; }
        //    return true;
        //}

        //[HttpPost("DIM_ItCapex_DigitalCapex_Criteria")]
        //public bool DIM_ItCapex_DigitalCapex_Criteria(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "IT CAPEX",
        //    "Digital CAPEX"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    return true;
        //}

        //[HttpPost("DIM_ItCapex_DigitalCapex_Criteria_TypeBenefit")]
        //public bool DIM_ItCapex_DigitalCapex_Criteria_TypeBenefit(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "IT CAPEX",
        //    "Digital CAPEX"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.TypeBenefit != "NON-FINANCIAL") { return false; }
        //    return true;
        //}

        //[HttpPost("DIM_ItCapex_DigitalCapex_Criteria_PayBackPeriod")]
        //public bool DIM_ItCapex_DigitalCapex_Criteria_PayBackPeriod(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "IT CAPEX",
        //    "Digital CAPEX"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.PayBackPeriod <= 3 || suggestion.PayBackPeriod == null) { return false; }
        //    return true;
        //}

        //[HttpPost("DIM_CostCapex")]
        //public bool DIM_CostCapex(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "Turnaround",
        //    "Overhaul",
        //    "CSR",
        //    "Welfare",
        //    "Lab & Quality",
        //    "Technical Support for R&D",
        //    "R&D",
        //    "Others"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (!suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.TypeBenefit == "NON-FINANCIAL") { return false; }
        //    if (suggestion.PayBackPeriod <= 3 || suggestion.PayBackPeriod == null) { return false; }
        //    return true;
        //}

        //[HttpPost("DIM_NON_CostCapex")]
        //public bool DIM_NON_CostCapex(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "Turnaround",
        //    "Overhaul",
        //    "CSR",
        //    "Welfare",
        //    "Lab & Quality",
        //    "Technical Support for R&D",
        //    "R&D",
        //    "Others"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (!suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.TypeBenefit != "NON-FINANCIAL") { return false; }
        //    return true;
        //}

        //[HttpPost("DIM_MAX_CostCapex")]
        //public bool DIM_MAX_CostCapex(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "Turnaround",
        //    "Overhaul",
        //    "CSR",
        //    "Welfare",
        //    "Lab & Quality",
        //    "Technical Support for R&D",
        //    "R&D",
        //    "Others"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (!suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.TypeBenefit == "NON-FINANCIAL") { return false; }
        //    if (suggestion.PayBackPeriod > 3 || suggestion.PayBackPeriod == null) { return false; }
        //    return true;
        //}

        

        //[HttpPost("DIM_Growth_SustainCore")]
        //public bool DIM_Growth_SustainCore(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "Growth: Backbone",
        //    "Growth: New business",
        //    "Growth: Build International Competitive base",
        //    "Growth: Diversify to performance chemicals",
        //    "Growth: Enhance green",
        //    "Sustain Core: Synergy",
        //    "Sustain Core: Operational Excellence",
        //    "Sustain Core: Marketing Excellence",
        //    "Sustain Core: Debot/Expansion",
        //    "Sustain Core: Chain Integration",
        //    "Sustain Core: New derivative",
        //    "Sustain Core: Map ta put retrofit",
        //    "Sustain Core: Energy saving"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (!suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr < 15 || suggestion.Irr == null) { return false; }
        //    if (suggestion.TypeBenefit == "NON-FINANCIAL") { return false; }
        //    if (suggestion.PayBackPeriod <= 3 || suggestion.PayBackPeriod == null) { return false; }
        //    return true;
        //}

        //[HttpPost("DIM_NON_FINANCIAL_Growth_SustainCore")]
        //public bool DIM_NON_FINANCIAL_Growth_SustainCore(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "Growth: Backbone",
        //    "Growth: New business",
        //    "Growth: Build International Competitive base",
        //    "Growth: Diversify to performance chemicals",
        //    "Growth: Enhance green",
        //    "Sustain Core: Synergy",
        //    "Sustain Core: Operational Excellence",
        //    "Sustain Core: Marketing Excellence",
        //    "Sustain Core: Debot/Expansion",
        //    "Sustain Core: Chain Integration",
        //    "Sustain Core: New derivative",
        //    "Sustain Core: Map ta put retrofit",
        //    "Sustain Core: Energy saving"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (!suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr < 15 || suggestion.Irr == null) { return false; }
        //    if (suggestion.TypeBenefit != "NON-FINANCIAL") { return false; }
        //    return true;
        //}

        ///

        /// CAPEX

        [HttpPost("CAPEX")]
        public bool CAPEX(Suggestion suggestion)
        {
            //main condition

            //"Turnaround",
            //"Overhaul",
            //"CSR",
            //"Welfare",
            //"Lab & Quality",
            //"Technical Support for R&D",
            //"R&D",
            //"Others"

            //Engineering Request ER

            //"Growth: Backbone",
            //"Growth: New business",
            //"Growth: Build International Competitive base",
            //"Growth: Diversify to performance chemicals",
            //"Growth: Enhance green",
            //"Sustain Core: Synergy",
            //"Sustain Core: Operational Excellence",
            //"Sustain Core: Marketing Excellence",
            //"Sustain Core: Debot/Expansion",
            //"Sustain Core: Chain Integration",
            //"Sustain Core: New derivative",
            //"Sustain Core: Map ta put retrofit",
            //"Sustain Core: Energy saving"

            // "Maintain Reliability"

            string[] typeOfInvestment = { "Environment", "Safety", "Law & Regulation" };
            if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
            if (suggestion.InvolveItDigital) { return false; }
            if (suggestion.BudgetSource != "ER") { return false; }
            if (!suggestion.RequestCapex) { return false; }
            if (suggestion.TypeOfInvestment != "Replacement") { return false; }
            if (suggestion.BudgetType != "Pool") { return false; }
            if (suggestion.BudgetType != "By initiative") { return false; }
            if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
            if (suggestion.TypeBenefit != "NON-FINANCIAL") { return false; }
            if (suggestion.PayBackPeriod <= 3 || suggestion.PayBackPeriod == null) { return false; }



            //conflict
            //group 1

            //"Turnaround",
            //"Overhaul",
            //"CSR",
            //"Welfare",
            //"Lab & Quality",
            //"Technical Support for R&D",
            //"R&D",
            //"Others"

            if (suggestion.TypeOfInvestment != "Replacement") { return false; }
            if (suggestion.BudgetType != "By initiative") { return false; }
            if (suggestion.CostEstCapex <= 300 || suggestion.CostEstCapex == null) { return false; }

            //group 2
            if (suggestion.TypeOfInvestment != "Engineering Request ER") { return false; }
            if (suggestion.BudgetType != "Pool") { return false; }
            if (suggestion.CostEstCapex <= 300 || suggestion.CostEstCapex == null) { return false; }

            //group 3
            if (suggestion.TypeOfInvestment != "Engineering Request ER") { return false; }
            if (suggestion.BudgetType != "By initiative") { return false; }
            if (suggestion.CostEstCapex <= 300 || suggestion.CostEstCapex == null) { return false; }


            //addition
            //group 1


            //cross  ->
            //group 1

            return true;
        }
        
        //[HttpPost("CAPEX_Pool_Cost_Replacement")]
        //public bool CAPEX_Pool_Cost_Replacement(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Replacement") { return false; }
        //    if (suggestion.BudgetType != "Pool") { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    return true;
        //}


        //[HttpPost("CAPEX_Replacement")]
        //public bool CAPEX_Replacement(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Replacement") { return false; }
        //    if (suggestion.BudgetType != "Pool") { return false; }
        //    return true;
        //}


        //[HttpPost("CAPEX_Replacement_Cost")]
        //public bool CAPEX_Replacement_Cost(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Replacement") { return false; }
        //    if (suggestion.BudgetType != "By initiative") { return false; }
        //    if (suggestion.CostEstCapex <= 300 || suggestion.CostEstCapex == null) { return false; }
        //    return true;
        //}

        //[HttpPost("CAPEX_Replacement_Criteria")]
        //public bool CAPEX_Replacement_Criteria(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Replacement") { return false; }
        //    if (suggestion.BudgetType != "By initiative") { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    return true;
        //}

        //[HttpPost("CAPEX_Replacement_Criteria_TypeBenefit")]
        //public bool CAPEX_Replacement_Criteria_TypeBenefit(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Replacement") { return false; }
        //    if (suggestion.BudgetType != "By initiative") { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.TypeBenefit != "NON-FINANCIAL") { return false; }
        //    return true;
        //}

        //[HttpPost("CAPEX_Replacement_Criteria_PayBackPeriod")]
        //public bool CAPEX_Replacement_Criteria_PayBackPeriod(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Replacement") { return false; }
        //    if (suggestion.BudgetType != "By initiative") { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.PayBackPeriod <= 3 || suggestion.PayBackPeriod == null) { return false; }
        //    return true;
        //}

        //[HttpPost("CAPEX_ER_Environment")]
        //public bool CAPEX_ER_Environment(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = { "Environment", "Safety", "Law & Regulation" };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource != "ER") { return false; }
        //    return true;
        //}

        //[HttpPost("CAPEX_CostCapex")]
        //public bool CAPEX_CostCapex(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "Turnaround",
        //    "Overhaul",
        //    "CSR",
        //    "Welfare",
        //    "Lab & Quality",
        //    "Technical Support for R&D",
        //    "R&D",
        //    "Others"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.CostEstCapex <= 300 || suggestion.CostEstCapex == null) { return false; }
        //    return true;
        //}

        //[HttpPost("CAPEX_Criteria")]
        //public bool CAPEX_Criteria(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "Turnaround",
        //    "Overhaul",
        //    "CSR",
        //    "Welfare",
        //    "Lab & Quality",
        //    "Technical Support for R&D",
        //    "R&D",
        //    "Others"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    return true;
        //}

        //[HttpPost("CAPEX_Criteria_TypeBenefit")]
        //public bool CAPEX_Criteria_TypeBenefit(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "Turnaround",
        //    "Overhaul",
        //    "CSR",
        //    "Welfare",
        //    "Lab & Quality",
        //    "Technical Support for R&D",
        //    "R&D",
        //    "Others"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.TypeBenefit != "NON-FINANCIAL") { return false; }
        //    return true;
        //}

        //[HttpPost("CAPEX_Criteria_PayBackPeriod")]
        //public bool CAPEX_Criteria_PayBackPeriod(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "Turnaround",
        //    "Overhaul",
        //    "CSR",
        //    "Welfare",
        //    "Lab & Quality",
        //    "Technical Support for R&D",
        //    "R&D",
        //    "Others"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.PayBackPeriod <= 3 || suggestion.PayBackPeriod == null) { return false; }
        //    return true;
        //}



        //[HttpPost("CAPEX_Pool_Engineering")]
        //public bool CAPEX_Pool_Engineering(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Engineering Request ER") { return false; }
        //    if (suggestion.BudgetType != "Pool") { return false; }
        //    return true;
        //}

        //[HttpPost("CAPEX_Pool_Cost_Engineering")]
        //public bool CAPEX_Pool_Cost_Engineering(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Engineering Request ER") { return false; }
        //    if (suggestion.BudgetType != "Pool") { return false; }
        //    if (suggestion.CostEstCapex <= 300 || suggestion.CostEstCapex == null) { return false; }
        //    return true;
        //}

        //[HttpPost("CAPEX_Engineering_Cost")]
        //public bool CAPEX_Engineering_Cost(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Engineering Request ER") { return false; }
        //    if (suggestion.BudgetType != "By initiative") { return false; }
        //    if (suggestion.CostEstCapex <= 300 || suggestion.CostEstCapex == null) { return false; }
        //    return true;
        //}

        //[HttpPost("CAPEX_Engineering_Criteria")]
        //public bool CAPEX_Engineering_Criteria(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Engineering Request ER") { return false; }
        //    if (suggestion.BudgetType != "By initiative") { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    return true;
        //}

        //[HttpPost("CAPEX_Engineering_Criteria_TypeBenefit")]
        //public bool CAPEX_Engineering_Criteria_TypeBenefit(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Engineering Request ER") { return false; }
        //    if (suggestion.BudgetType != "By initiative") { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.TypeBenefit != "NON-FINANCIAL") { return false; }
        //    return true;
        //}

        //[HttpPost("CAPEX_Engineering_Criteria_PayBackPeriod")]
        //public bool CAPEX_Engineering_Criteria_PayBackPeriod(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Engineering Request ER") { return false; }
        //    if (suggestion.BudgetType != "By initiative") { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.PayBackPeriod <= 3 || suggestion.PayBackPeriod == null) { return false; }
        //    return true;
        //}

        //[HttpPost("CAPEX_ER_Growth_SustainCore")]
        //public bool CAPEX_ER_Growth_SustainCore(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "Growth: Backbone",
        //    "Growth: New business",
        //    "Growth: Build International Competitive base",
        //    "Growth: Diversify to performance chemicals",
        //    "Growth: Enhance green",
        //    "Sustain Core: Synergy",
        //    "Sustain Core: Operational Excellence",
        //    "Sustain Core: Marketing Excellence",
        //    "Sustain Core: Debot/Expansion",
        //    "Sustain Core: Chain Integration",
        //    "Sustain Core: New derivative",
        //    "Sustain Core: Map ta put retrofit",
        //    "Sustain Core: Energy saving"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource != "ER") { return false; }
        //    return true;
        //}

        //[HttpPost("CAPEX_ER_Maintain")]
        //public bool CAPEX_ER_Maintain(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Maintain Reliability") { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource != "ER") { return false; }
        //    return true;
        //}

        /// 
        /// 
        /// 
        /// CIM


        [HttpPost("CIM")]
        public bool CIM(Suggestion suggestion)
        {
            //main condition
            string[] typeOfInvestment = {
            "Growth: Backbone",
            "Growth: New business",
            "Growth: Build International Competitive base",
            "Growth: Diversify to performance chemicals",
            "Growth: Enhance green",

            "Sustain Core: Synergy",
            "Sustain Core: Operational Excellence",
            "Sustain Core: Marketing Excellence",
            "Sustain Core: Debot/Expansion",
            "Sustain Core: Chain Integration",
            "Sustain Core: New derivative",
            "Sustain Core: Map ta put retrofit",


            "Sustain Core: Energy saving",

            "M&A",
            "Divestment",

            "IT CAPEX",
            "Digital CAPEX"

            };
            if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
            if (!suggestion.RequestCapex) { return false; }
            if (suggestion.CostEstCapex <= 300 || suggestion.CostEstCapex == null) { return false; }
            if (suggestion.InvolveItDigital) { return false; }
            if (suggestion.BudgetSource == "ER") { return false; }


            //conflict
            //group 1


            //addition
            //group 1
            if (suggestion.TypeOfInvestment != "CVC") { return false; }
            if (suggestion.CostEstCapex <= 15 || suggestion.CostEstCapex == null) { return false; }
            if (suggestion.CostEstCapexType != "USD") { return false; }

            //cross ->
            //group 1







            return true;
        }
        
        //[HttpPost("CIM_Growth")]
        //public bool CIM_Growth(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "Growth: Backbone",
        //    "Growth: New business",
        //    "Growth: Build International Competitive base",
        //    "Growth: Diversify to performance chemicals",
        //    "Growth: Enhance green"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.CostEstCapex <= 300 || suggestion.CostEstCapex == null) { return false; }
        //    return true;
        //}

        

        //[HttpPost("CIM_SustainCore")]
        //public bool CIM_SustainCore(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "Sustain Core: Synergy",
        //    "Sustain Core: Operational Excellence",
        //    "Sustain Core: Marketing Excellence",
        //    "Sustain Core: Debot/Expansion",
        //    "Sustain Core: Chain Integration",
        //    "Sustain Core: New derivative",
        //    "Sustain Core: Map ta put retrofit"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.CostEstCapex <= 300 || suggestion.CostEstCapex == null) { return false; }
        //    return true;
        //}

        

        //[HttpPost("CIM_SustainCore_EnergySaving")]
        //public bool CIM_SustainCore_EnergySaving(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Sustain Core: Energy saving") { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource == "ER") { return false; }
        //    if (suggestion.CostEstCapex <= 300 || suggestion.CostEstCapex == null) { return false; }
        //    return true;
        //}

        

        //[HttpPost("CIM_Divest_MnA")]
        //public bool CIM_Divest_MnA(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "M&A",
        //    "Divest"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    return true;
        //}

        //[HttpPost("CIM_CVC")]
        //public bool CIM_CVC(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "CVC") { return false; }
        //    if (suggestion.CostEstCapex <= 15 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.CostEstCapexType != "USD") { return false; }
        //    return true;
        //}

        //[HttpPost("CIM_ItCapex_DigitalCapex")]
        //public bool CIM_ItCapex_DigitalCapex(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "IT CAPEX",
        //    "Digital CAPEX"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.CostEstCapex <= 300 || suggestion.CostEstCapex == null) { return false; }
        //    return true;
        //}


         /// 


        /// MAX

        [HttpPost("MAX")]
        public bool MAX(Suggestion suggestion)
        {
            //main condition
            string[] typeOfInvestment = {
                "Growth: Backbone",
                "Growth: New business",
                "Growth: Build International Competitive base",
                "Growth: Diversify to performance chemicals",
                "Growth: Enhance green",


                "Sustain Core: Synergy",
                "Sustain Core: Operational Excellence",
                "Sustain Core: Marketing Excellence",
                "Sustain Core: Debot/Expansion",
                "Sustain Core: Chain Integration",
                "Sustain Core: New derivative",
                "Sustain Core: Map ta put retrofit",
                "Sustain Core: Energy saving",

                "IT CAPEX",
                "Digital CAPEX",

                "Turnaround",
                "Overhaul",
                "CSR",
                "Welfare",
                "Lab & Quality",
                "Technical Support for R&D",
                "R&D",
                "Others"
            };
            if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
            if (!suggestion.RequestCapex) { return false; }
            if (!suggestion.InvolveItDigital) { return false; }
            if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
            if (suggestion.Irr < 15 || suggestion.Irr == null) { return false; }
            if (suggestion.TypeBenefit == "NON-FINANCIAL") { return false; }
            if (suggestion.BudgetSource == "ER") { return false; }
            if (suggestion.PayBackPeriod > 3 || suggestion.PayBackPeriod == null) { return false; }



            //conflict
            //group 1

            //"Growth: Backbone",
            //"Growth: New business",
            //"Growth: Build International Competitive base",
            //"Growth: Diversify to performance chemicals",
            //"Growth: Enhance green"

            //"Sustain Core: Synergy",
            //"Sustain Core: Operational Excellence",
            //"Sustain Core: Marketing Excellence",
            //"Sustain Core: Debot/Expansion",
            //"Sustain Core: Chain Integration",
            //"Sustain Core: New derivative",
            //"Sustain Core: Map ta put retrofit"

            if (suggestion.Irr >= 15 || suggestion.Irr == null) { return false; }

            //group 2
            if (suggestion.TypeOfInvestment != "Sustain Core: Energy saving") { return false; }
            if (suggestion.Irr < 8.53 || suggestion.Irr == null) { return false; }



            //addition
            //group 1

            //"Growth: Backbone",
            //"Growth: New business",
            //"Growth: Build International Competitive base",
            //"Growth: Diversify to performance chemicals",
            //"Growth: Enhance green"

            //"Sustain Core: Synergy",
            //"Sustain Core: Operational Excellence",
            //"Sustain Core: Marketing Excellence",
            //"Sustain Core: Debot/Expansion",
            //"Sustain Core: Chain Integration",
            //"Sustain Core: New derivative",
            //"Sustain Core: Map ta put retrofit"

            if (suggestion.TypeOfInvestment != "Maintain Reliability") { return false; }
            if (suggestion.TypeBenefit == "" && suggestion.CostEstCapex == null && (suggestion.PayBackPeriod == null || suggestion.PayBackPeriod.GetValueOrDefault() != 0)) { return false; }


            //group 2
            if (suggestion.TypeOfInvestment != "Engineering Request ER") { return false; }

            if (suggestion.TypeOfInvestment != "Replacement") { return false; }
            if (suggestion.BudgetType != "By initiative") { return false; }
            if (suggestion.TypeBenefit == "" && suggestion.CostEstCapex == null && (suggestion.PayBackPeriod == null || suggestion.PayBackPeriod.GetValueOrDefault() != 0)) { return false; }



            //cross -> 
            //group 1


            //no case
            //group 1
            if (!suggestion.RequestCapex) { return false; }
            if (suggestion.TypeOfInvestment != "Maintain Reliability") { return false; }
            if (suggestion.InvolveItDigital) { return false; }
            if (suggestion.BudgetSource == "ER") { return false; }
            if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
            if (suggestion.Irr >= 15 || suggestion.Irr == null) { return false; }
            if (suggestion.TypeBenefit != "") { return true; }

            //group 2
            if (!suggestion.RequestCapex) { return false; }
            if (suggestion.TypeOfInvestment != "Sustain Core: Energy saving") { return false; }
            if (suggestion.InvolveItDigital) { return false; }
            if (suggestion.BudgetSource == "ER") { return false; }
            if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
            if (suggestion.Irr >= 8.53 || suggestion.Irr == null) { return false; }

            return true;
        }

        //[HttpPost("MAX_Maintain")]
        //public bool MAX_Maintain(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Maintain Reliability") { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource == "ER") { return false; }
        //    if (suggestion.TypeBenefit == "" && suggestion.CostEstCapex == null && (suggestion.PayBackPeriod == null || suggestion.PayBackPeriod.GetValueOrDefault() != 0)) { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr < 15 || suggestion.Irr == null) { return false; }
        //    if (suggestion.TypeBenefit == "NON-FINANCIAL") { return false; }
        //    if (suggestion.PayBackPeriod > 3 || suggestion.PayBackPeriod == null) { return false; }
        //    return true;
        //}

        //[HttpPost("MAX_Replacement")]
        //public bool MAX_Replacement(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Replacement") { return false; }
        //    if (suggestion.BudgetType != "By initiative") { return false; }
        //    if (suggestion.TypeBenefit == "" && suggestion.CostEstCapex == null && (suggestion.PayBackPeriod == null || suggestion.PayBackPeriod.GetValueOrDefault() != 0)) { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.TypeBenefit == "NON-FINANCIAL") { return false; }
        //    if (suggestion.PayBackPeriod > 3 || suggestion.PayBackPeriod == null) { return false; }
        //    return true;
        //}

        //[HttpPost("MAX_Growth")]
        //public bool MAX_Growth(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "Growth: Backbone",
        //    "Growth: New business",
        //    "Growth: Build International Competitive base",
        //    "Growth: Diversify to performance chemicals",
        //    "Growth: Enhance green"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource == "ER") { return false; }
        //    if (suggestion.TypeBenefit == "" && suggestion.CostEstCapex == null && (suggestion.PayBackPeriod == null || suggestion.PayBackPeriod.GetValueOrDefault() != 0)) { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr < 15 || suggestion.Irr == null) { return false; }
        //    if (suggestion.TypeBenefit == "NON-FINANCIAL") { return false; }
        //    if (suggestion.PayBackPeriod > 3 || suggestion.PayBackPeriod == null) { return false; }
        //    return true;
        //}

        //[HttpPost("MAX_Growth_NoCase")]
        //public bool MAX_Growth_NoCase(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "Growth: Backbone",
        //    "Growth: New business",
        //    "Growth: Build International Competitive base",
        //    "Growth: Diversify to performance chemicals",
        //    "Growth: Enhance green"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr >= 15 || suggestion.Irr == null) { return false; }
        //    return true;
        //}

        //[HttpPost("MAX_SustainCore")]
        //public bool MAX_SustainCore(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "Sustain Core: Synergy",
        //    "Sustain Core: Operational Excellence",
        //    "Sustain Core: Marketing Excellence",
        //    "Sustain Core: Debot/Expansion",
        //    "Sustain Core: Chain Integration",
        //    "Sustain Core: New derivative",
        //    "Sustain Core: Map ta put retrofit"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource == "ER") { return false; }
        //    if (suggestion.TypeBenefit == "" && suggestion.CostEstCapex == null && (suggestion.PayBackPeriod == null || suggestion.PayBackPeriod.GetValueOrDefault() != 0)) { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr < 15 || suggestion.Irr == null) { return false; }
        //    if (suggestion.TypeBenefit == "NON-FINANCIAL") { return false; }
        //    if (suggestion.PayBackPeriod > 3 || suggestion.PayBackPeriod == null) { return false; }
        //    return true;
        //}

        //[HttpPost("MAX_Sustaincore_NoCase")]
        //public bool MAX_Sustaincore_NoCase(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "Sustain Core: Synergy",
        //    "Sustain Core: Operational Excellence",
        //    "Sustain Core: Marketing Excellence",
        //    "Sustain Core: Debot/Expansion",
        //    "Sustain Core: Chain Integration",
        //    "Sustain Core: New derivative",
        //    "Sustain Core: Map ta put retrofit"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr >= 15 || suggestion.Irr == null) { return false; }
        //    return true;
        //}

        //[HttpPost("MAX_SustainCore_EnergySaving")]
        //public bool MAX_SustainCore_EnergySaving(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Sustain Core: Energy saving") { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource == "ER") { return false; }
        //    if (suggestion.TypeBenefit == "" && suggestion.CostEstCapex == null && (suggestion.PayBackPeriod == null || suggestion.PayBackPeriod.GetValueOrDefault() != 0)) { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr < 8.53 || suggestion.Irr == null) { return false; }
        //    if (suggestion.TypeBenefit == "NON-FINANCIAL") { return false; }
        //    if (suggestion.PayBackPeriod > 3 || suggestion.PayBackPeriod == null) { return false; }
        //    return true;
        //}

        //[HttpPost("MAX_ItCapex_DigitalCapex")]
        //public bool MAX_ItCapex_DigitalCapex(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "IT CAPEX",
        //    "Digital CAPEX"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeBenefit == "" && suggestion.CostEstCapex == null && (suggestion.PayBackPeriod == null || suggestion.PayBackPeriod.GetValueOrDefault() != 0)) { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.TypeBenefit == "") { return false; }
        //    if (suggestion.TypeBenefit == "NON-FINANCIAL") { return false; }
        //    if (suggestion.PayBackPeriod > 3 || suggestion.PayBackPeriod == null) { return false; }
        //    return true;
        //}

        //[HttpPost("MAX_CostCapex")]
        //public bool MAX_CostCapex(Suggestion suggestion)
        //{
        //    string[] typeOfInvestment = {
        //    "Turnaround",
        //    "Overhaul",
        //    "CSR",
        //    "Welfare",
        //    "Lab & Quality",
        //    "Technical Support for R&D",
        //    "R&D",
        //    "Others"
        //    };
        //    if (!typeOfInvestment.Contains(suggestion.TypeOfInvestment)) return false;
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.TypeBenefit == "" && suggestion.CostEstCapex == null && (suggestion.PayBackPeriod == null || suggestion.PayBackPeriod.GetValueOrDefault() != 0)) { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.TypeBenefit == "") { return false; }
        //    if (suggestion.TypeBenefit == "NON-FINANCIAL") { return false; }
        //    if (suggestion.PayBackPeriod > 3 || suggestion.PayBackPeriod == null) { return false; }
        //    return true;
        //}

        //[HttpPost("MAX_Engineering")]
        //public bool MAX_Engineering(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Engineering Request ER") { return false; }
        //    if (suggestion.BudgetType != "By initiative") { return false; }
        //    if (suggestion.TypeBenefit == "" && suggestion.CostEstCapex == null && (suggestion.PayBackPeriod == null || suggestion.PayBackPeriod.GetValueOrDefault() != 0)) { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.TypeBenefit == "NON-FINANCIAL") { return false; }
        //    if (suggestion.PayBackPeriod > 3 || suggestion.PayBackPeriod == null) { return false; }
        //    return true;
        //}

        

        //[HttpPost("MAX_Maintain_NoCase")]
        //public bool MAX_Maintain_NoCase(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Maintain Reliability") { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource == "ER") { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr >= 15 || suggestion.Irr == null) { return false; }
        //    if (suggestion.TypeBenefit != "") { return true; }
        //    return true;
        //}

        //[HttpPost("MAX_SustainCore_EnergySaving_NoCase")]
        //public bool MAX_SustainCore_EnergySaving_NoCase(Suggestion suggestion)
        //{
        //    if (!suggestion.RequestCapex) { return false; }
        //    if (suggestion.TypeOfInvestment != "Sustain Core: Energy saving") { return false; }
        //    if (suggestion.InvolveItDigital) { return false; }
        //    if (suggestion.BudgetSource == "ER") { return false; }
        //    if (suggestion.CostEstCapex > 300 || suggestion.CostEstCapex == null) { return false; }
        //    if (suggestion.Irr >= 8.53 || suggestion.Irr == null) { return false; }
        //    return true;
        //}




        [HttpPost("CVC_SendEmail")]
        public bool CVC_SendEmail(Suggestion suggestion)
        {
            if (!suggestion.RequestCapex) { return false; }
            if (suggestion.TypeOfInvestment != "CVC") { return false; }
            if (suggestion.CostEstCapex > 15 || suggestion.CostEstCapex == null) { return false; }
            if (suggestion.CostEstCapexType != "USD") { return false; }
            return true;
        }


    }
}
