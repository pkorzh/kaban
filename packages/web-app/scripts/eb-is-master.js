var AWS = require('aws-sdk');

AWS.config.update({region: 'eu-west-2'});

var opts = {  
	credentials: new AWS.EC2MetadataCredentials()
};

var elasticbeanstalk = new AWS.ElasticBeanstalk(opts);
var ec2 = new AWS.EC2(opts);
var metadata = new AWS.MetadataService(opts);

function runTaskOnMaster() {
	console.info('Beginning task');

	return new Promise((resolve, reject) => {
		metadata.request('/latest/meta-data/instance-id', (err, InstanceId) => {
			if (err) { return reject(err); }
			return resolve(InstanceId);
		});
	})
	.then((currentInstanceId) => {
		console.log('InstanceId', currentInstanceId);

		return new Promise( (resolve, reject) => {
		
			var params = {
				Filters: [
					{
						Name: 'resource-id',
						Values: [currentInstanceId]
					}
				]
			};

			ec2.describeTags(params, (err, data) => {
				if (err) {return reject('dt' + err);}

				var envIdTag = data.Tags.find(t => t.Key === 'elasticbeanstalk:environment-id');
				
				if (envIdTag === null) {
					return reject('Failed to find the value of "elasticbeanstalk:environment-id" tag.');
				}

				elasticbeanstalk.describeEnvironmentResources({ EnvironmentId: envIdTag.Value }, function (err, data) {
					if (err) { return reject('de' + err); }
					if (currentInstanceId !== data.EnvironmentResources.Instances[0].Id) { return resolve(false); }
					return resolve(true);
				});
			});
		});
	});
}

runTaskOnMaster()
	.then((isMaster) => process.exit(isMaster ? 0 : 1))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
