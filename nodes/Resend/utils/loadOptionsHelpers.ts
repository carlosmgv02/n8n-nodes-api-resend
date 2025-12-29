import {
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';
import { Segment, Domain, Topic, Template, PaginatedResponse } from '../types';

/**
 * Load segments for dropdown selection
 */
export async function getSegments(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	try {
		const response = await this.helpers.httpRequestWithAuthentication.call(
			this,
			'resendApi',
			{
				method: 'GET',
				url: 'https://api.resend.com/segments',
			},
		) as PaginatedResponse<Segment>;

		const segments = response.data || [];
		return segments.map((segment: Segment) => ({
			name: segment.name,
			value: segment.id,
			description: segment.description || undefined,
		}));
	} catch (error) {
		return [
			{
				name: 'Error loading segments',
				value: 'error',
			},
		];
	}
}

/**
 * Load verified domains for dropdown selection
 */
export async function getDomains(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	try {
		const response = await this.helpers.httpRequestWithAuthentication.call(
			this,
			'resendApi',
			{
				method: 'GET',
				url: 'https://api.resend.com/domains',
			},
		) as PaginatedResponse<Domain>;

		const domains = response.data || [];
		// Only show verified domains
		const verifiedDomains = domains.filter(
			(domain: Domain) => domain.status === 'verified',
		);

		return verifiedDomains.map((domain: Domain) => ({
			name: domain.name,
			value: domain.name,
			description: `Region: ${domain.region}`,
		}));
	} catch (error) {
		return [
			{
				name: 'Error loading domains',
				value: 'error',
			},
		];
	}
}

/**
 * Load topics for dropdown selection
 */
export async function getTopics(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	try {
		const response = await this.helpers.httpRequestWithAuthentication.call(
			this,
			'resendApi',
			{
				method: 'GET',
				url: 'https://api.resend.com/topics',
			},
		) as PaginatedResponse<Topic>;

		const topics = response.data || [];
		return [
			{
				name: 'None (No topic)',
				value: '',
				description: 'Do not assign a topic to this email',
			},
			...topics.map((topic: Topic) => ({
				name: topic.name,
				value: topic.id,
				description: topic.description || `Default: ${topic.default_subscription}`,
			})),
		];
	} catch (error) {
		return [
			{
				name: 'Error loading topics',
				value: 'error',
			},
		];
	}
}

/**
 * Load templates for dropdown selection
 */
export async function getTemplates(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	try {
		const response = await this.helpers.httpRequestWithAuthentication.call(
			this,
			'resendApi',
			{
				method: 'GET',
				url: 'https://api.resend.com/templates',
			},
		) as PaginatedResponse<Template>;

		const templates = response.data || [];
		// Only show published templates
		const publishedTemplates = templates.filter(
			(template: Template) => template.status === 'published',
		);

		return publishedTemplates.map((template: Template) => ({
			name: template.name,
			value: template.id,
			description: template.alias ? `Alias: ${template.alias}` : undefined,
		}));
	} catch (error) {
		return [
			{
				name: 'Error loading templates',
				value: 'error',
			},
		];
	}
}
