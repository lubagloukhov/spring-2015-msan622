######################################################################################################
##
## UTILITIES
##
######################################################################################################

getwd()
setwd("/Users/lubagloukhov/Documents/2015_Spring2/622_InfoVis/Project")
sd <- read.csv("SpeedDating.csv")
sd$attr_o_cat <- cut(sd$attr_o, breaks=seq(-0.5,10.5))

options(scipen=999)
library(reshape2)
require(dplyr)
library(rjson)
library(plyr)


######################################################################################################
##
## ATTRACTIVENESS CAT DISTRIBUTION (main plot)
##
######################################################################################################

detach("package:plyr", unload=TRUE)
final_df <- sd %>%
  group_by(attr_o_cat) %>%
  summarise(measure = n()) 
# rename for nicer plot labels
names(final_df) <- c("category","measure")
library(plyr)
final_df$category <- mapvalues(final_df$category, 
                            from = c("(-0.5,0.5]", "(0.5,1.5]", "(1.5,2.5]", "(2.5,3.5]", 
                                     "(3.5,4.5]", "(4.5,5.5]", "(5.5,6.5]", "(6.5,7.5]", "(7.5,8.5]", 
                                     "(8.5,9.5]", "(9.5,10.5]"), 
                            to =c(seq(0,10)))
final_df <- final_df[complete.cases(final_df),]
# export to json
cat(toJSON(unname(split(final_df, 1:nrow(final_df)))))

######################################################################################################
##
## ATTRIBUTE AVG by ATTRACTIVENESS CAT (bar charts below Main)
##
######################################################################################################

### BAR O

attributes0 <- c("attr_o", "sinc_o", "intel_o", "fun_o", "amb_o", "shar_o")
  # What the opposite sex thinks of the individual
sd_sub_1 <- sd[c("attr_o_cat",attributes0)]

# get groupwise means for each attr_o_cat
df1 <- sd_sub_1 %>%
  group_by(attr_o_cat) %>%
  summarise_each(funs(mean(., na.rm = TRUE)))
# get groupwise mean across all attr_o_cats
df2 <- sd_sub_1 %>%
  summarise_each(funs(mean(., na.rm = TRUE)))
df2$attr_o_cat <- "All"
# combine
df1_smelt <- melt(df1, id="attr_o_cat")
df2_smelt <- melt(df2, id="attr_o_cat")
final_df <- rbind(df1_smelt,df2_smelt)
final_df <- final_df[complete.cases(final_df),]
# rename for nicer plot labels
names(final_df) <- c("group","category","measure")
final_df$category <- mapvalues(final_df$category, 
               from = c("attr_o", "sinc_o", "intel_o", "fun_o", "amb_o", "shar_o"), 
               to = c("Attr", "Sinc", "Int", "Fun", "Amb", "Sh"))
final_df$group <- mapvalues(final_df$group, 
              from = c("(-0.5,0.5]", "(0.5,1.5]", "(1.5,2.5]", "(2.5,3.5]", 
                       "(3.5,4.5]", "(4.5,5.5]", "(5.5,6.5]", "(6.5,7.5]", "(7.5,8.5]", 
                       "(8.5,9.5]", "(9.5,10.5]", "All"), 
              to =c(seq(0,10),"All"))
# export to json
cat(toJSON(unname(split(final_df, 1:nrow(final_df)))))


### BAR 5

attributes5 <- c("attr5_1", "sinc5_1", "intel5_1", "fun5_1", "amb5_1")
# How do you think others perceive you?
sd_sub_1 <- sd[c("attr_o_cat",attributes5)]

# get groupwise means for each attr_o_cat
df1 <- sd_sub_1 %>%
  group_by(attr_o_cat) %>%
  summarise_each(funs(mean(., na.rm = TRUE)))
df1$shar5_1 <- 0
# get groupwise mean across all attr_o_cats
df2 <- sd_sub_1 %>%
  summarise_each(funs(mean(., na.rm = TRUE)))
df2$attr_o_cat <- "All"
df2$shar5_1 <- 0
# combine
df1_smelt <- melt(df1, id="attr_o_cat")
df2_smelt <- melt(df2, id="attr_o_cat")
final_df <- rbind(df1_smelt,df2_smelt)
final_df <- final_df[complete.cases(final_df),]
# rename for nicer plot labels
names(final_df) <- c("group","category","measure")
final_df$category <- mapvalues(final_df$category, 
                               from = c("attr5_1", "sinc5_1", "intel5_1", "fun5_1", "amb5_1", "shar5_1"), 
                               to =c("Attr", "Sinc", "Int", "Fun", "Amb","Sh"))
final_df$group <- mapvalues(final_df$group, 
                            from = c("(-0.5,0.5]", "(0.5,1.5]", "(1.5,2.5]", "(2.5,3.5]", 
                                     "(3.5,4.5]", "(4.5,5.5]", "(5.5,6.5]", "(6.5,7.5]", "(7.5,8.5]", 
                                     "(8.5,9.5]", "(9.5,10.5]", "All"), 
                            to =c(seq(0,10),"All"))
# export to json
cat(toJSON(unname(split(final_df, 1:nrow(final_df)))))


######################################################################################################
##
## ACTIVITY DISTRIBUTION by ATTRACTIVENESS CAT (para/ box & whisker plot)
##
######################################################################################################

#subset data
activities <-c("sports", "tvsports", "exercise", "dining", "museums", "hiking", "clubbing", "tv", "theater", "movies", "concerts", "music", "shopping", "yoga")
sub_vars <- c("attr_o_cat", activities )
sd_sub <- sd[sub_vars]
# normalize values
sd_sub_normALL <- sd_sub
sd_sub_normALL[activities] <- lapply(sd_sub_normALL[activities],scale)
# get average category rating
df1 <- sd_sub_normALL %>%
  group_by(attr_o_cat) %>%
  summarise_each(funs(mean(., na.rm = TRUE)))
names(df1) <- c("group", "sports", "tvsports", "exercise", "dining", "museums", 
                "hiking", "clubbing", "tv", "theater", "movies", "concerts", 
                "music", "shopping", "yoga")
# rename for nicer plot labels
df1$group <- mapvalues(df1$group, 
                            from = c("(-0.5,0.5]", "(0.5,1.5]", "(1.5,2.5]", "(2.5,3.5]", 
                                     "(3.5,4.5]", "(4.5,5.5]", "(5.5,6.5]", "(6.5,7.5]", "(7.5,8.5]", 
                                     "(8.5,9.5]", "(9.5,10.5]"), 
                            to =c(seq(0,10)))
# Change Factor columns to Character
i <- sapply(df1, is.factor)
df1[i] <- lapply(df1[i], as.character)
df1[12,] = c(NA,rep(0,14))
df1[12,1] = "ALL"

write.csv(df1[complete.cases(df1),], "data_activities_para.csv", row.names=F)
