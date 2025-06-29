Why Streams are fast ?
    
    Stream open file for the first time only and load all the data in internal buffer(RAM) and write all at once. After writing it close the file.

    But appendFileSync and writeFileSync open the file write the data(on DISK) and close it. Means it opens/close file for every write operation.

    so in the case of looping and writing the data of 1 lakh numbers stream were fast.