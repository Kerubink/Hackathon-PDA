const KEYWORDS = ["hotel", "flat", "pousada", "hotel fazenda", "hostel", "resort"];

/**
 * 
 * @param {Array} accommodations 
 * @param {string} keyword 
 * @returns {Array} 
 * @throws {Error} 
 */
export const filterByKeyword = (accommodations, keyword) => {
  if (!Array.isArray(accommodations)) {
    throw new Error('A lista de acomodações deve ser um array.');
  }

  if (typeof keyword !== 'string' || keyword.trim() === '') {
    throw new Error('A palavra-chave deve ser uma string válida.');
  }

  const lowerCaseKeyword = keyword.toLowerCase();
  const validKeywords = KEYWORDS.map((word) => word.toLowerCase()); 

  if (!validKeywords.includes(lowerCaseKeyword)) {
    throw new Error(`Palavra-chave inválida: "${keyword}". Use uma das seguintes: ${KEYWORDS.join(", ")}`);
  }

  const keywordCounts = {};
  KEYWORDS.forEach(keyword => {
    keywordCounts[keyword] = 0;
  });

  const filteredAccommodations = [];

  for (const accommodation of accommodations) {
    if (accommodation.name && accommodation.name.toLowerCase().includes(lowerCaseKeyword)) {
      filteredAccommodations.push(accommodation);
      if (KEYWORDS.some(keyword => accommodation.name.toLowerCase().includes(keyword))) {
        KEYWORDS.forEach(keyword => {
          if (accommodation.name.toLowerCase().includes(keyword)) {
            keywordCounts[keyword]++;
          }
        });
      }
      continue;
    }

    if (accommodation.name && validKeywords.some(keyword => accommodation.name.toLowerCase().includes(keyword))) {
      continue;
    }

    if (accommodation.type && accommodation.type.toLowerCase().includes(lowerCaseKeyword)) {
      filteredAccommodations.push(accommodation);
      KEYWORDS.forEach(keyword => {
        if (accommodation.type.toLowerCase().includes(keyword)) {
          keywordCounts[keyword]++;
        }
      });
      continue;
    }

    if (accommodation.description && accommodation.description.toLowerCase().includes(lowerCaseKeyword)) {
      filteredAccommodations.push(accommodation);
      KEYWORDS.forEach(keyword => {
        if (accommodation.description.toLowerCase().includes(keyword)) {
          keywordCounts[keyword]++;
        }
      });
    }
  }

  KEYWORDS.forEach(keyword => {
    console.log(`${keyword}: ${keywordCounts[keyword]}`);
  });

  if (filteredAccommodations.length === 0) {
    throw new Error(`Nenhuma acomodação encontrada com a palavra-chave: "${keyword}"`);
  }

  return filteredAccommodations;
};
