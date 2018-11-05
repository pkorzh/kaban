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
		const prefix = this.prefix
			? this.prefix.replace(/^\/|\/$/g, '') + '/'
			: '';

		const fullKey = `${prefix}${key}`;

		const params = {
			Body: buffer,
			Bucket: this.bucket,
			Key: fullKey,
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
}