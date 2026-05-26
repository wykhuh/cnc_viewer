https://www.youtube.com/watch?v=CZRdULKPG2M

# Diversity metrics easily explained: Shannon, Simpson, Gini, Chao1 and Hill numbers!

==
https://bio.libretexts.org/Bookshelves/Ecology/Biodiversity_(Bynum)

Biodiversity (Bynum)

==
Is measuring biodiversity possible on iNat?
https://forum.inaturalist.org/t/is-measuring-biodiversity-possible-on-inat/37142/

==

What is your Species to Observations ratio?
https://forum.inaturalist.org/t/what-is-your-species-to-observations-ratio/53531

Hi Forum, I thought it would be interesting to see different users observations to species ratios and how it aligns with how they use iNat. I know some people observe many hundreds of a small number of species, while others don’t repeat many species, and others observe organisms that don’t always get a species level ID.

Mine is .62 that being 1902 different observations at species grade and 3057 observations. Closer to 1 is less repeated species(or observations not at species level), closer to 0 is the opposite. This is due to me not usually making an observation for a common species more than once, unless there is something exceptional about the individual or location, and having many observations stuck above species.

~~

If you ever want to do your own local species richness estimate, it’s worth knowing which of your observations are unique. This also means trying to observe at least two of anything, anywhere, on multiple occasions. This is one possible idea to consider in optimising your ratio: Record everything at least twice if possible. I was privileged to coauthor a paper with Anne Chao et al specifically for citizen scientists on this topic. Feel free to ignore the maths; there is a useful online tool to use: https://besjournals.onlinelibrary.wiley.com/doi/abs/10.1111/2041-210X.12768

==

Species Accumulation Curves for iNat data
https://forum.inaturalist.org/t/species-accumulation-curves-for-inat-data/38222

I manage the iNat project for a park which previously had a published plant list of 400 species. With iNat data and curation by @graysquirrel that list is now close to 800 species, and new species are still being documented in the park. In analyzing these data, I’d like to ask the question “with continued sampling, roughly how many species would we likely end up at?”

This general question, but not in an iNat context, is what Species Accumulation Curves are meant to answer, and others have previously suggested that a useful step would be to develop code meant to answer that type of question using data that has the many oddities that ours do.

A general introduction to Species Accumulation Curves can be found here.

My question is, has anyone developed such a methodology and made it available yet? I have in mind an approach but do not want to duplicate the effort if it has already been done (and honestly can’t promise to find the time to implement my ideas).

https://forum.inaturalist.org/t/external-code-tools-etc-for-working-with-inat-wiki/15906

https://terrestrialecosystems.com/species-accumulation-curves/
~~

This experience may be useful for you https://forum.inaturalist.org/t/at-what-point-do-you-stop-searching-for-new-species-in-a-defined-area/16904

~~

The post it’s within is also a good one to look through as it’s very much tied up with this topic. So much so that it might actually be a good idea to merge the two.

https://forum.inaturalist.org/t/at-what-point-do-you-stop-searching-for-new-species-in-a-defined-area/16904/1

~~

The 2019 International Congress for Conservation Biology conference in Kuala Lumpur had a plenary talk, Rarefaction and Extrapolation: Standardizing Samples to Make Fair Comparisons of Biodiversity among Multiple Assemblages on nearly this exact subject:

In this talk, two types of standardization methods are reviewed: (1) Sample-size-based rarefaction and extrapolation methods aim to compare diversity estimates for equally-large samples determined by samplers. (2) Coverage-based rarefaction and extrapolation methods aim to compare diversity estimates for equally-complete samples; the sample completeness in this method is measured by sample coverage (the proportion of the total number of individuals that belong to the species detected in the sample), a concept originally developed by Alan Turing and I. J. Good in their cryptographic analysis during World War II. Contrary to intuition, sample coverage for the observed sample, rarefied samples, and extrapolated samples can be accurately estimated by the observed data themselves. These two types of standardization methods allow researchers to efficiently use all available data to make robust and detailed inferences about the sampled assemblages, and also to make objective comparisons among multiple assemblages. Hypothetical and real examples are presented for illustrating the use of the online software iNEXT (iNterpolation/EXTrapolation) to compute and plot seamless rarefaction/extrapolation sampling curves based on several diversity measures.

Look up Anne Chao ’s work.

https://conbio.org/images/content_conferences/Anne_Chao_Biography.pdf

https://sites.google.com/view/chao-lab-website/biodiversity-lectures?authuser=0

~~

Risky, but List Length Analysiss ?
Occupancy modeling is to complicated

List Length Analysis confirmed suspected species declines and increases. This method is an important complement to systematically designed intensive monitoring schemes and provides a means of utilizing data that may otherwise be deemed useless. The results of List Length Analysis can be used for targeting species of conservation concern for listing purposes or for more intensive monitoring. While Bayesian methods are not essential for List Length Analysis, they can offer more flexibility in interrogating the data and are able to provide a range of parameters that are easy to interpret and can facilitate conservation listing and prioritization.
https://www.uvm.edu/~ngotelli/manuscriptpdfs/Chapter%204.pdf
Try Search on (Citizen Science Statistics Analysis Datasets)
https://citizenscience.no/publications/
https://www.sciencedirect.com/science/article/pii/S0006320722004189

And i found a youtube about ListLength. It uses the

Number of Observed species
The Number of Days with observations
The Number of Observers

If you have a solution, would nice to post it
https://citizenscience.no/publications/

https://www.uvm.edu/~ngotelli/manuscriptpdfs/Chapter%204.pdf

Occupancy models in R Part 2: model comparisons (jamesepaterson.github.io)

~~

Chao1-index

What does the Chao1 index estimate? - Studybuff

00-Magurran-Prelims.dvi (uvm.edu)

Blockquote Shannon-Weaver and Simpson Diversity Indices
A definition of biodiversity is widely cited as follows:
“Biological diversity means the variability among living
organisms from the ecological complexes of which
organisms are part, and it is defined as species richness and
relative species abundance in space and time” [14]. A
variety of approaches have been used to quantify biological
diversity. Two main factors, richness and evenness, should
be taken into account when measuring the diversity of
certain samples. A measure of the number of different
kinds of organisms present in a particular community is
defined as richness; thus, species richness refers to the
number of different species present in a certain niche. If
more species are present in “A” than “B”, “A” is richer
than “B”. When it comes to species richness, it does not
consider the number of individuals of each species present
(Figs. 1A and 1B). Nevertheless, diversity depends not only
on richness, but also on evenness. Evenness compares the
uniformity of the population size of each of the species
https://www.researchgate.net/post/How-to-interpret-Chao1-and-Chao2-values
https://cran.r-project.org/web/packages/iNEXT/vignettes/Introduction.pdf
https://besjournals.onlinelibrary.wiley.com/doi/10.1111/2041-210X.12613
Chao1 is an estimator based on abundance. This means that the data it requires refer to the abundance of individuals belonging to a certain class in a sample. A sample is any list of species in a site, location, quadrant, country, unit of time, trap, etcetera. As we know, there are many species that are only represented by a few individuals in a sample (rare species), compared to the common species, which can be represented by numerous individuals. The Chao1 estimator is based on the presence of the former. That is, we need to know how many species are represented by only one individual in the sample (singletons), and how many species are represented by exactly two individuals (doubletons): Sest = Sobs + F2 / 2G, where: Sest is the number of classes ( in this case, number of species) that we want to know, Sobs is the number of species observed in a sample, F is the number of singletons and G is the number of doubletons. In the programEstimates a corrected formula has also been integrated for this model, which is applied when the number of doubletons is zero: Sest = Sobs + ((F2 / 2G + 1) - (FG / 2 (G + 1) 2)).

Chao2 is the estimator based on the incidence. This means that it needs presence-absence data of a species in a given sample, that is, only if the species is present and how many times is that species in the sample set: Sest = Sobs + (L2 / 2M), where: L is the number of species that occur only in one sample (“unique” species), and M is the number of species that occur in exactly two samples (“double” or “duplicate” species). For example, if we have a set of grids, we need to know how many species are in a grid and how many species are in two. The formula corrected in Estimates, which is applied when the number of doubles is zero, is: Sest = Sobs + ((L2 / 2M + 1) - (LM / 2 (M + 1) 2)). To use both estimators in ESTIMATES, data in the form of a matrix is ​​needed, where rows and columns can represent samples and species indistinctly; it is necessary to establish the order once the program has started. Estimates also allows the calculation of the standard deviation of the two estimators. Once several randomisations are made (50 recommended, but can be 100 or more), with or without replacement, and when the total number of samples has been used, the final value of the estimator is obtained and the results can be plotted. The number of samples is presented on the x axis, and the number of species in the dependent variable. Thus, the Sest and the Sobs can be compared. But the final graph is interpreted differently from the conventional one: when you have the total number of samples, there is a certain separation between the curve of the Sest and the Sobs. That separation would be indicating how many species are missing to register in that community. The more separated they are, we would expect that the total number of species that contains the place is greater than the one that we currently know.

For additional information please read the following chapter Estimating species richness in the following link:

https://www.uvm.edu/~ngotelli/manuscriptpdfs/Chapter%204.pdf

~~

Hi @dlevitis, I’m actually going to be working on some analysis related to this question in the coming weeks. I’m trying to put together a short talk for the Ecological Society of America meeting this summer on the topic. There are a lot of great answers here about various methods for dealing with rarefaction curves, Chao estimator etc.

In general, I don’t think the unstructured nature of iNat data presents a big problem. The alternative, structured surveys, e.g. bird point counts or vegetation transects, will greatly underestimate the richness of a larger park or region. So if you want to estimate what’s in your park, it might be better to have observers search non-randomly (as in iNat) for rare species to get a more complete accounting of biodiversity in the region.

This does become a problem if you want to compare parks or compare time periods. Then you need a way to account for any differences in the number of individuals sampled, the area and the sampling effort. The most helpful paper I’ve read on this is by Nick Gotelli (also his book is linked to in @ahospers comments). This link should give you access, let me know if it doesn’t work: https://onlinelibrary.wiley.com/share/SQYPFNNEKK4PRERWXTKS?target=10.1046/j.1461-0248.2001.00230.x

You can find another interesting paper comparing species area curves to species time curves here: https://onlinelibrary.wiley.com/share/XYYHKHUU9AZQYEU3XUIC?target=10.1046/j.1461-0248.2003.00497.x

Great to see this discussion and all the good ideas, I will follow up on this if I come up with anything interesting.

~~

Here are a couple of practical solutions that I think are the most promising, although there really isn’t a silver bullet to this vexing issue.

The first approach, and perhaps the most helpful, would be to build stacked species distribution models for all the plants in the regional flora. You would need spatial records for all the species that could possibly be in your park and some good spatial environmental layers. The estimated potential species richness of your park will be the sum of the probabilities that each regional species occurs in your park. Besides just richness this will also produce other useful outputs. For instance, it will give you a list of species that would be most likely to occur in your park based on the environment in the park. Then you can compare these to your current species list to see whats missing. It will also produce maps of where new species are most likely to be found in your park and so give you a better sense of where to look for those species. You can use the R SSDM package to build stacked species distribution models here (even has a gui):

https://besjournals.onlinelibrary.wiley.com/share/MCVZMJUX5UNNE9HRTXTP?target=10.1111/2041-210X.12841

https://cran.r-project.org/web/packages/SSDM/index.html

If your park is in California, this approach would be similar to using Calflora to generate a likely species checklist–I think there’s a tool for that in What Grows Here? https://www.calflora.org/entry/wgh.html

However, I think this approach tends to get less accurate at finer spatial resolutions and is sensitive to bias in the occurrence probabilities. My guess is that once you’ve looked at the predictions you may be able to refine these based on expert knowledge of the neighboring areas and come up with a reasonable estimate. I think this is a good approach for you situation because with nearly 800 species there probably aren’t too many species left in the regional flora that have not been found in the park (although I’m not sure).

The other approach is to extrapolate from the data collected in the park. The approach I would take would be to define a sampling unit from the iNat data. For instance, lump all observations taken during one calendar day by one observer (or observation party) as a “sample”. Then for each species count the number samples in which it is present. You should have a few species present in a lot of samples and a larger number of species present in only one or two samples. The iNEXT package in R has some functions that would allow you to estimate how sensitive the richness estimate is to additional sampling effort. The problem here is that the sampling behavior of iNaturalist observers differs from the sampling behavior assumed by the models in iNext. For instance, iNat observers seek out rare species in samples and probably skip common species. I still think you might get a reasonable estimate from this however. Here are a couple of papers that look at this problem using herbarium records, which present similar issues (maybe there’s something useful there):

https://onlinelibrary.wiley.com/share/ZHQTBHHSYHITEZZNYMGV?target=10.1111/j.1654-1103.2010.01247.x

https://bsapubs.onlinelibrary.wiley.com/share/YMDXUWKTUG5C5D8JMVFA?target=10.3732/ajb.1000215

Hopefully that’s helpful, if you and @graysquirrel want to explore this more let me know. Given your extensive sampling in the park it might be fun to make a case study out of this.

Let me know what you think

==

At what point do you stop searching for new species in a defined area?
https://forum.inaturalist.org/t/at-what-point-do-you-stop-searching-for-new-species-in-a-defined-area/16904

==
Easiest way to rank areas by biodiversity using iNaturalist data
https://forum.inaturalist.org/t/easiest-way-to-rank-areas-by-biodiversity-using-inaturalist-data/72706

However, measuring or estimating biodiversity is a very complicated issue.

For starters, there are actually multiple kinds and components of biodiversity. Generally the easiest to understand is species richness vs species evenness. Just because two different areas have the same number of species, does not mean they have equal biodiversity. The one with a more balanced or even distribution of species, instead of one dominating, is more biodiverse. A single “biodiversity value” can be produced using various indexes, notably Shannon’s index.

Furthermore, there are even multiple different kinds of species richness metrics, referred to as alpha, beta, and gamma diversity. These are most relevant in the context of surveys occurring on different scales. Alpha is the number of species within a particular ecosystem or area. Beta is the number of unique species compared between two or more plots or areas. Gamma is the number of species in total across multiple plots (basically just alpha with a larger area, I think, someone correct me if I am wrong). Beta is most interesting because it can tell you which areas are the most “significant” to preserving biodiversity, i.e. those containing species likely not found elsewhere.

Probably most significantly, this issue is complicated by the very large bias of iNaturalist’s database. The organisms that get observed the most are those which are interesting and easy to identify. Furthermore, the frequency of observations is highly concentrated in populated areas, in parks, and along trails. Many large areas have very few observations, even in populated countries like the US. There are ways to account for these, but they require advanced statistics and knowledge of the originating bias.

Generally speaking, however, average gamma biodiversity is relatively predicatable; it increases as you get closer to the equator or are lower in elevation, are higher in temperature, precipitation/available water (think wetlands), or sunlight. However, this does NOT show you the LOCAL areas which are the most unique (highest beta diversity), and which arguably represent the largest loss if they are destroyed. This depends on many more factors, including microclimate, land use history, structural diversity, and more.

EDIT 2: I also forgot to think about genetic diversity and ecosystem diversity, but those are much, much harder to extract from iNaturalist data and probably not what you were referring to anyway, although they are also very significant.

I study Conservation Biology as an undergrad. The topic of biodiversity conservation is soooo complex and nuanced, and there is a TON of potential for creativity and new solutions. It’s not so simple as “pick the ‘most biodiverse area’ and make it a park.” Without active engagement, anyway, biodiversity is rarely “maximized,” and may even decline over time. Intentional management, even if it seems detrimental, can be very beneficial to biodiversity (such as forest thinning, clearing patches, or conducting prescribed burns). The most surprising areas, even in cities, also have enormous potential for conserving biodiversity. iNaturalist, indeed, can highlight this oftentimes!

https://bio.libretexts.org/Courses/University_of_California_Davis/BIS_2B%253A_Introduction_to_Biology_-_Ecology_and_Evolution/02%253A_Biodiversity/2.02%253A_Measuring_Species_Diversity

https://bio.libretexts.org/Bookshelves/Ecology/Biodiversity_(Bynum)/7%253A_Alpha_Beta_and_Gamma_Diversity

~~

I think it would be a mistake to use iNaturalist data to “rank areas”, unless there is very careful consideration of what the purpose is and how to avoid misuse of such a ranking.

I am a well-published conservation biologist and have reads hundreds of academic papers where the authors calculate diversity metrics, usually with very little appreciation of what they are doing, and frequently with dangerously misleading results. From a biodiversity conservation perspective, which these authors typically claim to adopt, it is rarely of any relevance at all to compare species richness, even if adjusted for sampling effort. It is rarely of any relevance at all to calculate Shannon or other diversity indices. Yet they do it anyway.

What is generally more relevant is to understand the contribution that some area or land-use type makes to supporting the totality of global biodiversity. For example, if a small area supports the only population of a micro-endemic species, it is irreplaceably important, even if it has far fewer species or lower diversity than other areas. If a land-use type supports good populations of biome-restricted or endangered species, it is probably more important to protect it than one which supports only a set of more widespread or non-native species. There is also an enormous difference between a thriving population of a species, and the occasional vagrant occurrence, but data such as iNaturalist data are not really suitable for distinguishing these situations.

Diversity metrics don’t capture those sorts of nuances. You need to look at the data with some understanding of what you are looking at and why. iNaturalist data are fantastic, but this is not an application they are much use for.

There is already a plethora of maps which attempt to identify areas of greatest biodiversity value for different purposes and at different scales, such as the Biodiversity Hotspots and Key Biodiversity Areas. They each have their strengths and weaknesses, and as time goes on, iNaturalist will increasingly be one of the datasets used to inform these prioritisations, but not iNaturalist data in isolation.

~~

A very crude measure of biodiversity I use privately to decide where to go is looking at species divided by number of observations or number of observers (or on eBird, species divided by number of lists). This generally helps account for what’s probably the #1 factor in a place having more species, which is more observations. A city park in NYC with 1000 species recorded and 10,000 observers prooooobably has less biodiversity than somewhere bumfuck nowhere with 100 species and 10 observers.

@@

While species counts are inflated by number of observers I think this overcorrects in the opposite example. By this metric most local parking lots are much more diverse than yosemite national park! The 10th observation in an area is way more likely to be a new species to that area than the 100,000th, regardless of biodiversity. I think these are both good numbers to look at, but I think dividing one by the other is going to distort things quite a bit. I think even just raw species counts will give you a better sense of biodiversity, even though these are obviously massively biased towards heavily observed areas. That being said, what you are suggesting certainly works better as a metric for finding undersurveyed areas, and that’s a noble pursuit in and of itself.

~~

The number of observations on iNaturalist cannot be used as a surrogate measure of the species abundance in the environment, for too many reasons to list here. I advise you to drop the whole idea of the Shannon Diversity Index for identifying areas of high biodiversity, because that is not what it is for. The index is to tell you whether a community is dominated by a few species or whether species abundance is more even. In other words, will the next specimen you pick up probably be the same species as the previous specimen.

If you want to put iNaturalist data through the Shannon formula, there is no harm in that, and if you think it tells you something interesting, I will happily read about it in the forum. But whatever that exercise comes up with won’t have much relevance to the outside world.

I wouldn’t say Shannon’s Index is measuring biodiversity. I feel a measure of biodiversity would be telling you how many species, and perhaps how widely spread they are within the range of taxonomy. Whereas Shannon is telling you about the frequency distribution of the species: e.g. whether the most abundant three species make up 80%, 15% and 4% of the total and the rest are minor players, or whether the top three are 8%, 5% and 4% and there are several more in the same ballpark.

~~

I think @jhbratton has given a good explanation of why Shannon is not especially useful for ranking areas. The basic issue is that the biodiversity value of a local place needs to be put into a global context, and that is rarely possible using traditional indices in the context of a geographically limited study. If only a single Mallard duck is encountered in a particular study, at just one of the sampled sites, that species will be considered as a “rare” species for the study, even if it is not rare at all globally. The indices typically do not incorporate the wealth of additional information that we have on global distribution, population size, conservation status and other attributes of each species.

Where there are very extreme differences between areas, such as an environment dominated by a few non-native species versus one that has a more even and diverse set of natives, Shannon could be a useful way to quantify that, but should never be used in isolation.

In terms of how iNaturalist data might be used, it can be helpful in defining species distributions and the occurrence of certain species in certain areas, such as trigger species (endemic or threatened) for conservation designations or prioritizations, such as the KBA network I linked earlier. All of those are constructed on top of the basic species distribution information that sites like iNaturalist provides, but those analyses are likely best done downstream of iNaturalist.
