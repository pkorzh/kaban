import S3 from 'aws-sdk/clients/s3';

export default class S3Storage {
	constructor(options) {
		Object.assign(this, options);

		this.client = new S3({
			accessKeyId: options.accessKeyId,
			secretAccessKey: options.secretAccessKey,
		});
	}

	async upload({key, buffer}) {
		const params = {
			Body: buffer,
			Bucket: this.bucket,
			Key: this.fullKey(key),
		};

		const s3PutObjectRes = await this.client.putObject(params)
			.promise();

		return s3PutObjectRes;
	}

	async listBuckets() {
		const s3ListBucketsRes = await this.client.listBuckets()
			.promise();

		return s3ListBucketsRes.Buckets.map(b => b.Name)
	}

	preprocess({name, type}) {
		const params = {
			Bucket: this.bucket,
			Key: this.fullKey(name),
			Expires: 60,
			ContentType: type,
			ACL: 'public-read'
		};

		const signedRequest = this.client.getSignedUrl('putObject', params);

		return {
			signedRequest,
			url: `https://${this.bucket}.s3.amazonaws.com/${this.fullKey(name)}`
		};
	}

	cleanPrefix(prefix) {
		return prefix
			? prefix.replace(/^\/|\/$/g, '') + '/'
			: '';
	}

	fullKey(key) {
		return `${this.cleanPrefix(this.prefix)}${key}`;
	}
}