#pragma once

#include <nextclade/nextclade.h>

#include <stdexcept>
#include <string>
#include <common/safe_vector.h>

struct RefPeptideInternal;
struct PeptideInternal;

namespace Nextclade {

  class ErrorGeneNotFound : public ErrorNonFatal {
  public:
    ErrorGeneNotFound(const std::string& geneName, const GeneMap& geneMap);
  };

  class ErrorRefPeptideNotFound : public ErrorNonFatal {
  public:
    explicit ErrorRefPeptideNotFound(const std::string& name);
  };


  AminoacidChangesReport getAminoacidChanges(                    //
    const NucleotideSequence& ref,                               //
    const NucleotideSequence& query,                             //
    const std::map<std::string, RefPeptideInternal>& refPeptides,//
    const safe_vector<PeptideInternal>& queryPeptides,           //
    const Range& alignmentRange,                                 //
    const GeneMap& geneMap                                       //
  );

}// namespace Nextclade
