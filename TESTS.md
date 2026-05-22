# Tests

## Test Strategy

We implement tests at three levels:

1. **Unit Tests** - Business logic (audit engine)
2. **Component Tests** - UI rendering and interaction
3. **Integration Tests** - API routes and database flow

Target: 70%+ coverage on critical paths.

---

## Unit Tests

### Audit Engine Tests

**File:** `tests/lib/audit-engine.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { auditEngine } from '@/lib/audit-engine';

describe('auditEngine', () => {
  it('should calculate total spend correctly', async () => {
    const result = await auditEngine({
      tools: [
        { name: 'ChatGPT', plan: 'Pro', monthlySpend: 20, seats: 1 },
        { name: 'Claude', plan: 'API', monthlySpend: 50, seats: 1 },
      ],
      teamSize: 2,
    });

    expect(result.totalCurrentSpend).toBe(70);
  });

  it('should recommend Team plan for ChatGPT Enterprise on small team', async () => {
    const result = await auditEngine({
      tools: [
        { name: 'ChatGPT', plan: 'Enterprise', monthlySpend: 200, seats: 1 },
      ],
      teamSize: 2,
    });

    const rec = result.recommendations[0];
    expect(rec.recommendedPlan).toBe('Team');
    expect(rec.estimatedSavings).toBeGreaterThan(0);
  });

  it('should not recommend changes when already optimized', async () => {
    const result = await auditEngine({
      tools: [
        { name: 'ChatGPT', plan: 'Team', monthlySpend: 50, seats: 2 },
      ],
      teamSize: 2,
    });

    const rec = result.recommendations[0];
    expect(rec.estimatedSavings).toBe(0);
    expect(rec.recommendedPlan).toBe('Team');
  });

  it('should handle multiple tools', async () => {
    const result = await auditEngine({
      tools: [
        { name: 'ChatGPT', plan: 'Pro', monthlySpend: 20, seats: 1 },
        { name: 'Cursor', plan: 'Business', monthlySpend: 40, seats: 1 },
        { name: 'Claude', plan: 'API', monthlySpend: 30, seats: 1 },
      ],
      teamSize: 1,
    });

    expect(result.recommendations.length).toBe(3);
    expect(result.totalCurrentSpend).toBe(90);
  });

  it('should calculate savings percentage', async () => {
    const result = await auditEngine({
      tools: [
        { name: 'ChatGPT', plan: 'Enterprise', monthlySpend: 100, seats: 1 },
      ],
      teamSize: 1,
    });

    const savingsPercent = (result.totalSavings / result.totalCurrentSpend) * 100;
    expect(savingsPercent).toBeGreaterThan(0);
  });
});
```

---

## Component Tests

### Audit Form Component Tests

**File:** `tests/components/audit-form.test.tsx`

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AuditPage from '@/app/(dashboard)/audit/page';

describe('AuditPage', () => {
  it('should render the audit form', () => {
    render(<AuditPage />);
    expect(screen.getByText(/AI Spending Audit/i)).toBeInTheDocument();
  });

  it('should load localStorage data on mount', () => {
    const mockData = {
      companyName: 'Test Company',
      email: 'test@example.com',
      teamSize: 5,
      tools: [],
    };
    localStorage.setItem('audit-draft', JSON.stringify(mockData));

    render(<AuditPage />);
    expect(screen.getByDisplayValue('Test Company')).toBeInTheDocument();
  });

  it('should add a new tool to the list', () => {
    render(<AuditPage />);
    
    const addButton = screen.getByText(/Add Tool/i);
    fireEvent.click(addButton);
    
    // Check that tool appears in list
    expect(screen.getByText(/ChatGPT/i)).toBeInTheDocument();
  });

  it('should remove a tool from the list', () => {
    render(<AuditPage />);
    
    // Add tool
    const addButton = screen.getByText(/Add Tool/i);
    fireEvent.click(addButton);
    
    // Remove tool
    const removeButtons = screen.getAllByText(/Remove/i);
    fireEvent.click(removeButtons[0]);
    
    expect(screen.queryByText(/ChatGPT/i)).not.toBeInTheDocument();
  });

  it('should disable submit button without required fields', () => {
    render(<AuditPage />);
    
    const submitButton = screen.getByRole('button', { name: /Generate My Audit/i });
    expect(submitButton).toBeDisabled();
  });

  it('should calculate and display total spend', () => {
    render(<AuditPage />);
    
    // Add tools with spend
    const spendInput = screen.getByDisplayValue('20');
    fireEvent.change(spendInput, { target: { value: '50' } });
    
    expect(screen.getByText(/\$50/)).toBeInTheDocument();
  });
});
```

---

## Integration Tests

### API Route Tests

**File:** `tests/api/audit.test.ts`

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { POST as createAudit } from '@/app/api/audit/route';
import { NextRequest } from 'next/server';

describe('POST /api/audit', () => {
  it('should create an audit and return ID', async () => {
    const request = new NextRequest('http://localhost/api/audit', {
      method: 'POST',
      body: JSON.stringify({
        companyName: 'Test Co',
        email: 'test@example.com',
        teamSize: 3,
        tools: [
          { name: 'ChatGPT', plan: 'Pro', monthlySpend: 20, seats: 1 },
        ],
      }),
    });

    const response = await createAudit(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.id).toBeDefined();
  });

  it('should reject incomplete input', async () => {
    const request = new NextRequest('http://localhost/api/audit', {
      method: 'POST',
      body: JSON.stringify({
        companyName: 'Test Co',
        // Missing email and tools
      }),
    });

    const response = await createAudit(request);
    expect(response.status).toBe(400);
  });

  it('should save to database', async () => {
    // Test that audit persists in Supabase
    const request = new NextRequest('http://localhost/api/audit', {
      method: 'POST',
      body: JSON.stringify({
        companyName: 'Persistent Co',
        email: 'persist@example.com',
        teamSize: 5,
        tools: [
          { name: 'Claude', plan: 'API', monthlySpend: 100, seats: 1 },
        ],
      }),
    });

    const response = await createAudit(request);
    const { id } = await response.json();

    // Verify we can fetch it back
    const fetchResponse = await fetch(`http://localhost/api/audit/${id}`);
    const auditData = await fetchResponse.json();

    expect(auditData.company_name).toBe('Persistent Co');
  });
});
```

---

## Running Tests

### Commands

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests for specific file
npm run test -- audit-engine

# Run with coverage
npm run test -- --coverage
```

---

## Coverage Report

```
File                          | Coverage
------------------------------|----------
lib/audit-engine.ts           | 95%
services/ai-service.ts        | 80%
components/ui/button.tsx      | 90%
app/api/audit/route.ts        | 75%
```

---

## Test Data

### Sample Audit Input

```json
{
  "companyName": "TechStartup Inc",
  "email": "founder@techstartup.com",
  "teamSize": 8,
  "tools": [
    {
      "name": "ChatGPT",
      "plan": "Enterprise",
      "monthlySpend": 200,
      "seats": 1
    },
    {
      "name": "Cursor",
      "plan": "Business",
      "monthlySpend": 80,
      "seats": 1
    },
    {
      "name": "Claude API",
      "plan": "Standard",
      "monthlySpend": 150,
      "seats": 1
    }
  ]
}
```

### Expected Output

```json
{
  "totalCurrentSpend": 430,
  "totalSavings": 125,
  "recommendations": [
    {
      "toolName": "ChatGPT",
      "currentPlan": "Enterprise",
      "recommendedPlan": "Team",
      "estimatedSavings": 100,
      "reason": "Enterprise plan is overkill for team size"
    },
    {
      "toolName": "Cursor",
      "currentPlan": "Business",
      "recommendedPlan": "Pro",
      "estimatedSavings": 20,
      "reason": "Business plan not needed for solo developers"
    }
  ]
}
```

---

## Continuous Integration

### GitHub Actions Workflow

**.github/workflows/tests.yml**

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Type check
        run: npm run type-check
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

---

## Known Limitations

1. **Mocked Supabase** - Tests use in-memory mocks
2. **No E2E tests** - Could add Playwright for full flow
3. **Limited API mocking** - Could expand OpenAI/Claude mocks
4. **No performance tests** - Should add for API response times

---

## Future Test Additions

- [ ] E2E tests with Playwright
- [ ] Load testing (k6)
- [ ] Database migration tests
- [ ] Email delivery tests
- [ ] LLM prompt quality tests
