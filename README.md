CSC318 Project - Smardrobe
==========================

Introduction
------------
University of Toronto CSC318-The Design of Interactive Computational Media course project.

This is a mobile application where it will help users decide what to wear for the day. Users will be able to store photos of their clothes into the application database and using these photos, the application will create a matching outfit from this database. Users can favourite their outfits, and Edit or delete existing clothes stored in the application.

Testing
-------
### Testing on Android
1. Copy all files in `Webpages` folder into assets --> www in ADT if you look into Package Explorer.
2. Deploy simulator or deploy into to device.

### Testing on Browser
1. This can be test on your browser by just opening one of the html files. **NOTE:** That some functionality like camera may not work.

Contributing to this Project
----------------------
If this is your first time using github or Android Development, please take a look into this wiki page: [Getting Setup](https://github.com/choiboi/CSC318-Smardrobe/wiki/Getting-Setup). These are instruction on getting you guys setup to use Github and Android Development.

In this project we will not branching out and instead use the default `master` branch. Since, we are only using the `master` branch this will be like SVN where we will have conflicts if one does not update their local branch before committing. Therefore, I suggest people to notify every team members via Facebook group page or any other form of communication that you made changes and it has been pushed into the repository. 

When committing, please do not commit `/bin` files and hidden mac files (for example `.DS_STORE`). If you do, you can easily remove it by using the commands below. My useful TIP is to use `$ git status` command when committing and/or adding.

### Project Folder Structure
* `Android` folder contains all the source code for the Android application. These code will be rarely used, and only be touched to try the application on Android. It can be easily imported into ADT.
* `Webpages` folder will contain our project work and `Webpages` root folder will contains all our html files.
* `Webpages/js-framework` and `Webpages/css-framework` contains all the open source files (for example jQuery) that will be used for this project.
* `Webpages/css` and `Webpages/js` contains all the css and js files that we create for this project.

### Some Commands
To clone the repository use this command in the directory where you want the folder to be located:

    $ git clone git@github.com:choiboi/CSC318-Smardrobe.git

To commit into the repository:

    # Adding files. Only do this step if Git does not have files on record.
    $ git add <list of files>
    
    # Commit with message.
    $ git commit -m "<commit message>" <files>
    
    # Pushing into repository.
    $ git push origin master
    
To update local repository:

    $ git pull origin master
    
Deleting files in the repository:

    $ git rm [-r | recursively remove files in the directory] <file or directory>
    
    $ git commit -m "<commit message>" <removed files>
    
    $ git push origin master

Project Members
---------------
 * [Xiao Dong](https://github.com/xiax)
 * [Tom Zaragoza](https://github.com/tomzaragoza)
 * [Mina Hong](https://github.com/dreamypolaris)
 * [Jerry Dongwen Chen](https://github.com/amoz)
 * [James Choi](https://github.com/choiboi)
