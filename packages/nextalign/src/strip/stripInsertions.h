#pragma once

#include <nextalign/nextalign.h>

#include <string>
#include <common/safe_vector.h>

#include "../alphabet/nucleotides.h"
#include <common/contract.h>
#include "../utils/safe_cast.h"
#include "nextalign/private/nextalign_private.h"


template<typename Letter>
struct StripInsertionsResult {
  Sequence<Letter> queryStripped;
  safe_vector<InsertionInternal<Letter>> insertions;
};


template<typename Letter>
inline StripInsertionsResult<Letter> stripInsertions(const Sequence<Letter>& ref, const Sequence<Letter>& query) {
  const int refLength = safe_cast<int>(ref.size());
  const int queryLength = safe_cast<int>(query.size());
  precondition_equal(refLength, queryLength);

  StripInsertionsResult<Letter> result;
  result.queryStripped.reserve(refLength);

  int insertionStart = -1;
  int refPos = -1;
  Sequence<Letter> currentInsertion;
  for (int i = 0; i < refLength; ++i) {
    const auto& c = ref[i];
    if (c == Letter::GAP) {
      if (currentInsertion.empty()) {
        currentInsertion = query[i];
        // NOTE: by convention we set position of insertion to be the index of a character that precedes the insertion,
        // i.e. a position of reference nucleotide *after* which the insertion have happened.
        insertionStart = refPos;
      } else {
        currentInsertion += query[i];
      }
    } else {
      result.queryStripped += query[i];
      refPos++;
      if (!currentInsertion.empty()) {
        const auto length = safe_cast<int>(currentInsertion.size());

        result.insertions.emplace_back(
          InsertionInternal<Letter>{.pos = insertionStart, .length = length, .ins = currentInsertion});

        currentInsertion = Sequence<Letter>{};
        insertionStart = -1;
      }
    }
  }

  precondition_less_equal(result.queryStripped.size(), refLength);

  for (auto c : result.queryStripped) {
    precondition_less(c, Letter::SIZE);
  }

  return result;
}
