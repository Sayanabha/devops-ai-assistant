def triage_prompt(log: str, context: str) -> str:
    return f"""
You are a senior DevOps engineer. Analyze the following pipeline log and retrieved context.
Identify the root cause, affected component, severity, and suggest a fix.

--- RETRIEVED CONTEXT ---
{context}

--- PIPELINE LOG ---
{log}

Respond in this format:
**Root Cause:** ...
**Affected Component:** ...
**Severity:** Low | Medium | High | Critical
**Suggested Fix:** ...
**Confidence:** Low | Medium | High
"""

def docqa_prompt(question: str, context: str) -> str:
    return f"""
You are a helpful DevOps assistant. Use the retrieved runbook/documentation context below to answer the engineer's question accurately.
If the answer is not in the context, say so clearly.

--- RETRIEVED CONTEXT ---
{context}

--- QUESTION ---
{question}

Answer:
"""

def testgen_prompt(requirements: str) -> str:
    return f"""
You are a QA engineer. Generate structured test cases from the following requirements.
Return a JSON array. Each test case must have:
- id (string)
- title (string)
- preconditions (string)
- steps (list of strings)
- expected_result (string)
- priority (Low | Medium | High)
- type (Unit | Integration | E2E | Regression)

Return ONLY valid JSON. No explanation. No markdown fences.

--- REQUIREMENTS ---
{requirements}
"""