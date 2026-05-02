// lib/tasks.js
// 60 real, safe tasks using gov/edu/wikipedia. Rotates daily at 12:00 AM IST.

export const MASTER_TASKS = [
  { name: "Learn: What is UPI", reward: 5, url: "https://www.npci.org.in/what-we-do/upi/product-overview" },
  { name: "Read: RBI Savings Guide", reward: 7, url: "https://www.rbi.org.in/commonman/English/Scripts/FAQs.aspx?Id=462" },
  { name: "Watch: SEBI Investor Basics", reward: 6, url: "https://investor.sebi.gov.in" },
  { name: "Check: NSE Market Watch", reward: 8, url: "https://www.nseindia.com/market-data/live-equity-market" },
  { name: "Read: BSE About Us", reward: 5, url: "https://www.bseindia.com/static/about_bse.aspx" },
  { name: "Learn: Mutual Funds FAQ", reward: 9, url: "https://www.amfiindia.com/investor-corner/knowledge-center" },
  { name: "Visit: EPFO Member Portal", reward: 7, url: "https://www.epfindia.gov.in/site_en/For_Employees.php" },
  { name: "Read: NPS Benefits", reward: 10, url: "https://www.npscra.nsdl.co.in/features-and-benefits-of-nps.php" },
  { name: "Check: Income Tax India", reward: 8, url: "https://www.incometax.gov.in/iec/foportal" },
  { name: "Learn: GST Portal", reward: 6, url: "https://www.gst.gov.in" },
  { name: "Read: Digital India", reward: 5, url: "https://www.digitalindia.gov.in" },
  { name: "Visit: UIDAI Aadhaar", reward: 7, url: "https://uidai.gov.in" },
  { name: "Check: PM Jan Dhan Yojana", reward: 6, url: "https://www.pmjdy.gov.in" },
  { name: "Learn: Atal Pension Yojana", reward: 8, url: "https://www.npscra.nsdl.co.in/scheme-details.php" },
  { name: "Read: Sukanya Samriddhi", reward: 9, url: "https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Account.aspx" },
  { name: "Visit: PPF Account Details", reward: 7, url: "https://www.indiapost.gov.in/Financial/Pages/Content/Public-Provident-Fund-Account.aspx" },
  { name: "Check: Kisan Vikas Patra", reward: 6, url: "https://www.indiapost.gov.in/Financial/Pages/Content/Kisan-Vikas-Patra.aspx" },
  { name: "Learn: NSC Scheme", reward: 8, url: "https://www.indiapost.gov.in/Financial/Pages/Content/National-Savings-Certificates.aspx" },
  { name: "Read: Senior Citizens Scheme", reward: 9, url: "https://www.indiapost.gov.in/Financial/Pages/Content/Senior-Citizen-Savings-Scheme.aspx" },
  { name: "Visit: RBI Monetary Policy", reward: 10, url: "https://www.rbi.org.in/scripts/Annualpolicy.aspx" },
  { name: "Read: Personal Finance Wiki", reward: 5, url: "https://en.wikipedia.org/wiki/Personal_finance" },
  { name: "Learn: Compound Interest", reward: 6, url: "https://en.wikipedia.org/wiki/Compound_interest" },
  { name: "Check: Stock Market Wiki", reward: 5, url: "https://en.wikipedia.org/wiki/Stock_market" },
  { name: "Read: Inflation Explained", reward: 7, url: "https://en.wikipedia.org/wiki/Inflation" },
  { name: "Visit: Credit Score Wiki", reward: 6, url: "https://en.wikipedia.org/wiki/Credit_score" },
  { name: "Learn: Budget Definition", reward: 5, url: "https://en.wikipedia.org/wiki/Budget" },
  { name: "Read: Asset Allocation", reward: 8, url: "https://en.wikipedia.org/wiki/Asset_allocation" },
  { name: "Check: Bond Market", reward: 7, url: "https://en.wikipedia.org/wiki/Bond_market" },
  { name: "Learn: Exchange-Traded Fund", reward: 9, url: "https://en.wikipedia.org/wiki/Exchange-traded_fund" },
  { name: "Read: Index Fund Basics", reward: 6, url: "https://en.wikipedia.org/wiki/Index_fund" },
  { name: "Visit: Recession Wiki", reward: 5, url: "https://en.wikipedia.org/wiki/Recession" },
  { name: "Learn: Financial Literacy", reward: 7, url: "https://en.wikipedia.org/wiki/Financial_literacy" },
  { name: "Read: Retirement Planning", reward: 8, url: "https://en.wikipedia.org/wiki/Retirement_planning" },
  { name: "Check: Insurance Wiki", reward: 6, url: "https://en.wikipedia.org/wiki/Insurance" },
  { name: "Learn: Diversification", reward: 7, url: "https://en.wikipedia.org/wiki/Diversification_(finance)" },
  { name: "Read: Risk Management", reward: 8, url: "https://en.wikipedia.org/wiki/Risk_management" },
  { name: "Visit: Cryptocurrency Wiki", reward: 5, url: "https://en.wikipedia.org/wiki/Cryptocurrency" },
  { name: "Learn: Blockchain Basics", reward: 6, url: "https://en.wikipedia.org/wiki/Blockchain" },
  { name: "Read: Fintech Wiki", reward: 5, url: "https://en.wikipedia.org/wiki/Financial_technology" },
  { name: "Check: Central Bank Wiki", reward: 7, url: "https://en.wikipedia.org/wiki/Central_bank" },
  { name: "Visit: NITI Aayog", reward: 6, url: "https://www.niti.gov.in" },
  { name: "Read: MyGov India", reward: 5, url: "https://www.mygov.in" },
  { name: "Learn: Startup India", reward: 8, url: "https://www.startupindia.gov.in" },
  { name: "Check: Make in India", reward: 6, url: "https://www.makeinindia.com" },
  { name: "Visit: Skill India", reward: 7, url: "https://www.skillindia.gov.in" },
  { name: "Read: Consumer Affairs", reward: 5, url: "https://consumeraffairs.nic.in" },
  { name: "Learn: Cyber Crime Portal", reward: 9, url: "https://cybercrime.gov.in" },
  { name: "Check: National Portal India", reward: 6, url: "https://www.india.gov.in" },
  { name: "Visit: PMO India", reward: 5, url: "https://www.pmindia.gov.in/en" },
  { name: "Read: Ministry of Finance", reward: 8, url: "https://www.finmin.nic.in" },
  { name: "Learn: IRDAI Portal", reward: 7, url: "https://www.irdai.gov.in" },
  { name: "Check: PFRDA Website", reward: 8, url: "https://www.pfrda.org.in" },
  { name: "Visit: CIBIL Score Check", reward: 9, url: "https://www.cibil.com" },
  { name: "Read: SIDBI Schemes", reward: 7, url: "https://www.sidbi.in" },
  { name: "Learn: NABARD Info", reward: 6, url: "https://www.nabard.org" },
  { name: "Check: IFSC Code Search", reward: 5, url: "https://www.rbi.org.in/scripts/ifscmicr.aspx" },
  { name: "Visit: Banking Ombudsman", reward: 8, url: "https://www.rbi.org.in/Scripts/AboutUsDisplay.aspx?pg=BankingOmbudsmen.htm" },
  { name: "Read: Financial Education", reward: 7, url: "https://www.rbi.org.in/financialeducation" },
  { name: "Learn: Sovereign Gold Bond", reward: 10, url: "https://www.rbi.org.in/Scripts/SGB.aspx" },
  { name: "Check: RBI Kehta Hai", reward: 6, url: "https://www.rbi.org.in/kehtahai" },
];

export const getDailyTasks = () => {
  const IST_OFFSET = 5.5 * 60 * 60 * 1000; // UTC+5:30
  const nowIST = new Date(Date.now() + IST_OFFSET);
  const startOfYear = new Date(nowIST.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((nowIST - startOfYear) / 86400000);

  return Array.from({ length: 20 }, (_, i) => {
    const index = (dayOfYear * 20 + i) % MASTER_TASKS.length;
    return {
      id: i + 1, // Keep 1-20 for cooldown compatibility
     ...MASTER_TASKS[index]
    };
  });
};