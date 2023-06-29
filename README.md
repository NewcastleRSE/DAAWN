# DAAWN  - Digitised Assessment for Aphasia of WritiNg

## About

DAAWN is an online assessment tool for aphasia, which uses the Comprehensive Aphasia Test (CAT). It has been developed in conjunction with Dr Fiona Menger in the School of Education, Communication and Language Sciences.

The tool is designed to be used by people with aphasia in conjunction with their speech therapists. The users work through a series of exercises which can be configured in levels of difficulty. A report is available to the therapists after the user has finished which scores levels of word and sentence level accuracy.

Site deployed at: [https://daawn.ncldata.dev/](https://daawn.ncldata.dev/)

### Project Team

* Becky Osselton, Newcastle University  ([rebecca.osselton@newcastle.ac.uk](mailto:rebecca.osselton@newcastle.ac.uk))
* Fiona Menger, Newcastle University  ([fiona.menger@newcastle.ac.uk](mailto:fiona.menger@newcastle.ac.uk))


### RSE Contact
Becky Osselton, RSE Team, Newcastle University


### Built With

Technical stack description with links e.g.

* [Vue.js](https://vuejs.org/)

### Prerequisites

Node.js

### Installation

Clone the repository and then install dependencies with :

```npm install```


### Running Locally

```npm run dev```

The server runs locally with hot reload at localhost:8080


## Roadmap

- [ ] Initial Research
- [ ] Minimum viable product
- [ ] Alpha Release
- [x] Feature-Complete Release


## Prodution Deployment

Running the command below builds and minifies code for production. Source code is compiled into the dist directory.

```npm run build```

Deployment is automated and pushes the dist folder to a 'daawn' storage account on Azure. The application build lives in the $web container.

## Contributing

### Branches

Main and dev

### License

Creative Commons Attribution-NonCommercial 4.0 International License

https://creativecommons.org/licenses/by-nc/4.0/

#### Cite

Menger, F., Forshaw, M., Morris, J., Osselton, R. (2021) Digitised Assessment for Aphasia of Writing. https://daawn.ncldata.dev

#### BibTeX


              @misc{daawn_2021,
                  author       = {Menger, Fiona and
                                  Forshaw, Matthew and
                                  Morris, Julie and
                                  Osselton, Rebecca},
                  year         = 2021,
                  journal      = {Digitised Assessment for Aphasia of Writing},
                  url          = {https://daawn.ncldata.dev}
              }
