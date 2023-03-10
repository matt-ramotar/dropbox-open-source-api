const { Schema, SchemaTypes, model } = require('mongoose');
const ObjectId = SchemaTypes.ObjectId;
const paginate = require('mongoose-paginate-v2');

const repositorySchema = new Schema(
  {
    githubId: { required: true, type: SchemaTypes.Number },
    name: { required: true, type: SchemaTypes.String },
    owner: { required: false, type: ObjectId, ref: 'Owner' },
    htmlUrl: { required: true, type: SchemaTypes.String },
    description: { required: false, type: SchemaTypes.String },
    contributors: { required: true, type: [ObjectId], ref: 'Contributor' },
    languages: { required: false, type: [ObjectId], ref: 'Language' },
    forksCount: { required: true, type: SchemaTypes.Number },
    stargazersCount: { required: true, type: SchemaTypes.Number },
    watchersCount: { required: true, type: SchemaTypes.Number },
    openIssuesCount: { required: true, type: SchemaTypes.Number },
    git_url: { required: true, type: SchemaTypes.String },
    ssh_url: { required: true, type: SchemaTypes.String },
    license: { required: false, type: SchemaTypes.String },
    tags: { required: false, type: [ObjectId], ref: 'Tag' },
    created: { required: true, type: SchemaTypes.Date },
    updated: { required: true, type: SchemaTypes.Date },
    isPublic: { required: true, type: SchemaTypes.Boolean },
    emoji: { required: false, type: SchemaTypes.String },
  },
  { timestamps: true },
);
repositorySchema.plugin(paginate);
const Repository = model('Repository', repositorySchema);

const ownerSchema = new Schema({
  githubId: { required: true, type: SchemaTypes.Number },
  name: { required: true, type: SchemaTypes.String },
  htmlUrl: { required: true, type: SchemaTypes.String },
  avatarUrl: { required: true, type: SchemaTypes.String },
  type: { required: true, type: SchemaTypes.String, enum: ['Organization', 'User'] },
});
const Owner = model('Owner', ownerSchema);

const contributorSchema = new Schema({
  githubId: { required: true, type: SchemaTypes.Number },
  username: { required: true, type: SchemaTypes.String },
  avatarUrl: { required: true, type: SchemaTypes.String },
  htmlUrl: { required: true, type: SchemaTypes.String },
});

const Contributor = model('Contributor', contributorSchema);

const languageSchema = new Schema({
  name: { required: true, type: SchemaTypes.String },
});
const Language = model('Language', languageSchema);

const tagSchema = new Schema({
  name: { required: true, type: SchemaTypes.String },
});
const Tag = model('Tag', tagSchema);

module.exports = {
  Repository,
  Contributor,
  Language,
  Tag,
  Owner,
};
