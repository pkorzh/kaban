import S3Storage from './s3';

export default {
	from(config) {
		switch(config.type) {
			case 's3':
				return new S3Storage(config);
			default:
				throw new Error('Unsupported storage type');
		}
	}
}

export {
	S3Storage
};