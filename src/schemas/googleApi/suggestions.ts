type MatchedSubstring = {
  length: number;
  offset: number;
};

type Term = {
  offset: number;
  value: string;
};

type StructuredFormatting = {
  main_text: string;
  main_text_matched_substrings: MatchedSubstring[];
  secondary_text: string;
};

export type Suggestion = {
  description: string;
  matched_substrings: MatchedSubstring[];
  place_id: string;
  reference: string;
  structured_formatting: StructuredFormatting;
  terms: Term[];
  types: string[];
};

export type Suggestions = Suggestion[];
