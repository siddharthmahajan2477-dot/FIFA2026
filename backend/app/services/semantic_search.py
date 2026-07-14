from typing import List, Dict, Any

class SemanticSearchService:
    @staticmethod
    async def parse_natural_language_query(query: str) -> Dict[str, Any]:
        normalized = query.lower()
        if "france" in normalized:
            return {"intent": "query_match", "filter": "team:France"}
        elif "parking" in normalized:
            return {"intent": "query_parking", "filter": "nearest"}
        return {"intent": "generic_search", "query": query}
