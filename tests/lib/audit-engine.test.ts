import { describe, it, expect } from 'vitest';
import { auditEngine } from '@/lib/audit-engine';

describe('Audit Engine - Basic Tests', () => {
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

    it('should return recommendations array', async () => {
        const result = await auditEngine({
            tools: [
                { name: 'ChatGPT', plan: 'Pro', monthlySpend: 20, seats: 1 },
            ],
            teamSize: 1,
        });

        expect(Array.isArray(result.recommendations)).toBe(true);
        expect(result.recommendations.length).toBe(1);
    });
});
