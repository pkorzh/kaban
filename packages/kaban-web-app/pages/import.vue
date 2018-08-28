<template>
	<b-container fluid>
		<b-row>
			<b-col cols="12" class="mb-3">
				<h1>Title</h1>
			</b-col>
		</b-row>
		<b-row>
			<b-col cols="3" class="mt-5">
				<div class="form-check mb-1">
					<input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
					<label class="form-check-label" for="exampleRadios1">
						Select one
					</label>
				</div>
				<div class="form-check mb-1">
					<input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
					<label class="form-check-label" for="exampleRadios2">
						Select two
					</label>
				</div>
				<div class="form-check mb-1">
					<input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3">
					<label class="form-check-label" for="exampleRadios3">
						Select three
					</label>
				</div>
				<div class="form-check">
					<input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="option4">
					<label class="form-check-label" for="exampleRadios4">
						Select four
					</label>
				</div>
			</b-col>
			<b-col cols="9">
				<h2>AMD-666 Issue</h2>
				<div class="import-form">
					<div class="import-form-title"><strong>Step 1 of 4</strong>: Step's name</div>
					<div class="import-form-subtitle">Select project</div>
					<div class="import-form-area">
						<div class="import-form-label">Current Project</div>
						<div class="import-form-select">
							<IconedSelect v-model="editableContent" :getter="getter" />
						</div>
						<div class="import-form-label">New Project</div>
						<div class="import-form-select">
							<IconedSelect v-model="editableContent" :getter="getter" />
						</div>
					</div>
					<div class="import-form-subtitle">Select issue type</div>
					<div class="import-form-area">
						<div class="import-form-label">Current issue type</div>
						<div class="import-form-select">
							<IconedSelect v-model="editableContent" :getter="getter" />
						</div>
						<div class="import-form-label">New issue type</div>
						<div class="import-form-select">
							<IconedSelect v-model="editableContent" :getter="getter" />
						</div>
					</div>
				</div>
				<div>
					<button class="btn btn-primary mr-3">
						Next
						<font-awesome-icon icon="angle-double-right" class="ml-2" />
					</button>
					<button class="btn btn-danger">
						Close
					</button>
				</div>
			</b-col>
		</b-row>
	</b-container>
</template>