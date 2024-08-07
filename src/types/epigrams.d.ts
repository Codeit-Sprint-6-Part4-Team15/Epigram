export interface epigramsParams {
    id?: number;
    limit?: number;
    cursor?: number;
    keyword?: string;
    writerId?: number;
  }

  export interface PostEpigramData {
    tags?: string[];
    referenceUrl?: string;
    referenceTitle?: string;
    author?: string;
    content?: string;
  }