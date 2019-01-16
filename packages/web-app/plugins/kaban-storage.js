import * as actions from '@/actions'

export default ({$axios, store}, inject) => {
	const storage = {
		async preprocess({name, type}) {
			const data = await $axios.post('/api/storage/preprocess', {name, type});
			return data.data;
		},
		async upload(file) {
			const { signedRequest, url } = await storage.preprocess(file);

			return new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest();
				xhr.open('PUT', signedRequest);
				xhr.onreadystatechange = () => {
					if(xhr.readyState === 4){
						if(xhr.status === 200){
							resolve({name: file.name, url});
						}
						else{
							reject();
						}
					}
				};
				xhr.send(file);
			});
		}
	};

	inject('storage', storage);
}
