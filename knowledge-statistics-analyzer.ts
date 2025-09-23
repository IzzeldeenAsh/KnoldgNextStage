interface Employee {
  uuid: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: string[];
  profile_photo_url: string | null;
  country: string;
  insighter_status: string;
  verified: boolean;
  verified_as_insighter: boolean;
  company: any;
  knowledge_type_statistics: { [key: string]: number };
  knowledge_request_statistics: {
    approved: number;
    declined: number;
    pending: number;
  };
}

interface EmployeeData {
  employees: Employee[];
  links: any;
  meta: any;
}

interface KnowledgeTypeStatistics {
  [key: string]: number;
}

class KnowledgeStatisticsAnalyzer {
  
  /**
   * Analyzes employee data and returns aggregated knowledge type statistics
   * @param employeeData - The employee data structure
   * @returns Object containing totals for each knowledge type and overall total
   */
  static analyzeKnowledgeTypeStatistics(employeeData: EmployeeData): {
    totals: KnowledgeTypeStatistics;
    overallTotal: number;
    breakdown: { type: string; count: number }[];
  } {
    const totals: KnowledgeTypeStatistics = {};
    let overallTotal = 0;

    // Process each employee's knowledge_type_statistics
    employeeData.employees.forEach(employee => {
      const stats = employee.knowledge_type_statistics;
      
      // Aggregate each knowledge type
      Object.keys(stats).forEach(type => {
        const count = stats[type];
        totals[type] = (totals[type] || 0) + count;
        overallTotal += count;
      });
    });

    // Create breakdown array for easier display
    const breakdown = Object.keys(totals).map(type => ({
      type,
      count: totals[type]
    }));

    return {
      totals,
      overallTotal,
      breakdown
    };
  }

  /**
   * Formats the analysis results for display
   * @param analysis - The analysis results
   * @returns Formatted string representation
   */
  static formatResults(analysis: ReturnType<typeof KnowledgeStatisticsAnalyzer.analyzeKnowledgeTypeStatistics>): string {
    let result = "Knowledge Type Statistics Analysis:\n";
    result += "=====================================\n\n";
    
    result += "Breakdown by Type:\n";
    analysis.breakdown.forEach(item => {
      result += `- ${item.type}: ${item.count}\n`;
    });
    
    result += `\nOverall Total: ${analysis.overallTotal}\n`;
    
    return result;
  }
}

// Example usage with your data
const employeeData: EmployeeData = {
  employees: [
    {
      "uuid": "b6caf14f-f014-401b-bffe-089a9aed6872",
      "name": "Tester Nester",
      "first_name": "Tester",
      "last_name": "Nester",
      "email": "vutyri@forexnews.bg",
      "roles": [
        "client",
        "company"
      ],
      "profile_photo_url": null,
      "country": "United States of America",
      "insighter_status": "active",
      "verified": true,
      "verified_as_insighter": true,
      "company": {
        "id": 4,
        "legal_name": "Tester Comp",
        "website": "www.forexnews.bg",
        "verified_email": "vutyri@forexnews.bg",
        "about_us": "Test",
        "register_document": null,
        "logo": "https://4sighta-common.s3.eu-north-1.amazonaws.com/insighter/company/4/logo/1753722977_Group 237570.png",
        "address": "Adreer",
        "company_phone": "+303425353454",
        "status": "active",
        "verified": false,
        "social": [],
        "primary_activate_at": null,
        "certifications": [
          {
            "id": 39,
            "name": "1753722976_3D Toasts Status.png",
            "type": "professional_certifications",
            "url": "https://4sighta-common.s3.eu-north-1.amazonaws.com/company/4/certification/professional_certifications/1753722976_3D Toasts Status.png"
          }
        ],
        "industries": [
          {
            "id": 41,
            "name": "Economy",
            "slug": "economy",
            "weight": 0,
            "image": null
          },
          {
            "id": 43,
            "name": "Politics & Government",
            "slug": "politics-government",
            "weight": 0,
            "image": null
          }
        ],
        "consulting_field": [
          {
            "id": 22,
            "name": "Marketing Consulting",
            "names": {
              "en": "Marketing Consulting",
              "ar": "استشارات التسويق"
            }
          },
          {
            "id": 23,
            "name": "Brand Strategy",
            "names": {
              "en": "Brand Strategy",
              "ar": "استراتيجية العلامة التجارية"
            }
          },
          {
            "id": 24,
            "name": "Market Research",
            "names": {
              "en": "Market Research",
              "ar": "أبحاث السوق"
            }
          },
          {
            "id": 25,
            "name": "Digital Marketing",
            "names": {
              "en": "Digital Marketing",
              "ar": "التسويق الرقمي"
            }
          },
          {
            "id": 26,
            "name": "Customer Experience Design",
            "names": {
              "en": "Customer Experience Design",
              "ar": "تصميم تجربة العملاء"
            }
          }
        ]
      },
      "knowledge_type_statistics": {
        "data": 1
      },
      "knowledge_request_statistics": {
        "approved": 0,
        "declined": 0,
        "pending": 0
      }
    },
    {
      "uuid": "5a0c3b1e-6979-4aa9-8317-b48f11a7ac9e",
      "name": "Marin Sivak",
      "first_name": "Marin",
      "last_name": "Sivak",
      "email": "agentm007@tignovate.com",
      "roles": [
        "client",
        "company-insighter"
      ],
      "profile_photo_url": null,
      "country": "United Kingdom",
      "insighter_status": "active",
      "verified": true,
      "verified_as_insighter": true,
      "company": {
        "id": 4,
        "legal_name": "Tester Comp",
        "website": "www.forexnews.bg",
        "verified_email": "vutyri@forexnews.bg",
        "about_us": "Test",
        "register_document": null,
        "logo": "https://4sighta-common.s3.eu-north-1.amazonaws.com/insighter/company/4/logo/1753722977_Group 237570.png",
        "address": "Adreer",
        "company_phone": "+303425353454",
        "status": "active",
        "verified": false,
        "social": [],
        "primary_activate_at": null,
        "certifications": [
          {
            "id": 39,
            "name": "1753722976_3D Toasts Status.png",
            "type": "professional_certifications",
            "url": "https://4sighta-common.s3.eu-north-1.amazonaws.com/company/4/certification/professional_certifications/1753722976_3D Toasts Status.png"
          }
        ],
        "industries": [
          {
            "id": 41,
            "name": "Economy",
            "slug": "economy",
            "weight": 0,
            "image": null
          },
          {
            "id": 43,
            "name": "Politics & Government",
            "slug": "politics-government",
            "weight": 0,
            "image": null
          }
        ],
        "consulting_field": [
          {
            "id": 22,
            "name": "Marketing Consulting",
            "names": {
              "en": "Marketing Consulting",
              "ar": "استشارات التسويق"
            }
          },
          {
            "id": 23,
            "name": "Brand Strategy",
            "names": {
              "en": "Brand Strategy",
              "ar": "استراتيجية العلامة التجارية"
            }
          },
          {
            "id": 24,
            "name": "Market Research",
            "names": {
              "en": "Market Research",
              "ar": "أبحاث السوق"
            }
          },
          {
            "id": 25,
            "name": "Digital Marketing",
            "names": {
              "en": "Digital Marketing",
              "ar": "التسويق الرقمي"
            }
          },
          {
            "id": 26,
            "name": "Customer Experience Design",
            "names": {
              "en": "Customer Experience Design",
              "ar": "تصميم تجربة العملاء"
            }
          }
        ]
      },
      "knowledge_type_statistics": {
        "manual": 1
      },
      "knowledge_request_statistics": {
        "approved": 1,
        "declined": 0,
        "pending": 0
      }
    }
  ],
  "links": {
    "first": "https://api.foresighta.co/api/company/insighter?page=1",
    "last": "https://api.foresighta.co/api/company/insighter?page=1",
    "prev": null,
    "next": null
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 1,
    "links": [
      {
        "url": null,
        "label": "&laquo; Previous",
        "active": false
      },
      {
        "url": "https://api.foresighta.co/api/company/insighter?page=1",
        "label": "1",
        "active": true
      },
      {
        "url": null,
        "label": "Next &raquo;",
        "active": false
      }
    ]
  }
};

// Run the analysis
const analysis = KnowledgeStatisticsAnalyzer.analyzeKnowledgeTypeStatistics(employeeData);
const formattedResults = KnowledgeStatisticsAnalyzer.formatResults(analysis);

console.log(formattedResults);
console.log("\nDetailed Analysis Object:");
console.log(JSON.stringify(analysis, null, 2));

// Export for use in other modules
export { KnowledgeStatisticsAnalyzer, Employee, EmployeeData, KnowledgeTypeStatistics };