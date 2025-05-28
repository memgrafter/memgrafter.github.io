# My Awesome Blog

This is a *bare-minimum* template to create a [Jekyll] blog that:

- uses the [Moonwalk] theme;
- can be built and published on [GitHub Pages];
- can be built and previewed locally, and published on other platforms.

More specifically, the created site:

- uses a gem-based approach, i.e. uses a `Gemfile` and loads the `moonwalk` gem;
- uses the [GitHub Pages / Actions workflow] to build and publish the site on GitHub Pages.

To get started with creating a site, simply:

1. create a GitHub repository
2. go to Settings > Pages > Build and deployment > Source, and select GitHub Actions

After completing the creation of your new site on GitHub, update it as needed:

## Replace the content of the template pages

Update the following files to your own content:

- `index.md` (your new home page)
- `README.md` (information for those who access your site repo on GitHub)

## Creating New Blog Posts

To create a new blog post, create a new Markdown file in the `_posts` directory (you may need to create this directory first). The filename must follow the format `YYYY-MM-DD-your-post-title.md`.

Each post must start with [front matter](https://jekyllrb.com/docs/front-matter/):

