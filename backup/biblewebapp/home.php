<div id="homeBannerWrapper" style="width: 920px; margin: 0 0 0 -130px; padding: 40px 152px 0;">
    <div id="homeBanner">
        <div id="imageMap" style="margin: 0 0 0 -153px;">
            <img src="/media/img/home-bg.jpg" usemap="#Image-Maps_3201005041131205" border="0" width="1225" height="310" alt="Effortless Summer Chic" />
            <map name="Image-Maps_3201005041131205">
                <area shape="rect" coords="180,50,210,120" href="/item/view/stpnenaf1y7m4n_h94et7kthtxsy342jkfwoswuh/" alt="Sikara's Three Tiered Brushed Leaf Earrings - 18K" title="Sikara's Three Tiered Brushed Leaf Earrings - 18K"    />
                <area shape="rect" coords="230,70,275,120" href="/item/view/yqd2anmp3exp9tobj84m4g027f6n1kqm1uc19oey/" alt="GEM multi-faceted Earrings 18k Gold by Arosha Luigi Taglia" title="GEM multi-faceted Earrings 18k Gold by Arosha Luigi Taglia"    />
                <area shape="rect" coords="320,40,350,150" href="/item/view/k6l5rw7t4uvkkpyidjixbf70v6apat5lmde51-mr/" alt="Honolulu Earring by Amrita Singh" title="Honolulu Earring by Amrita Singh"    />
                <area shape="rect" coords="375,120,410,180" href="/item/view/f9-yq85e5-i1ccj8wcnwz6ji40u9nvhtsff0b-b6/" alt="Large Chandelier with Swarovski by Maylily" title="Large Chandelier with Swarovski by Maylily"    />
                <area shape="rect" coords="410,120,430,230" href="/item/view/c0tzbgh_g4wkl2lrbi8pbaoblbcgezzgwh6yobxu/" alt="Signs by Nikolai Balabin" title="Signs by Nikolai Balabin"    />
                <area shape="rect" coords="600,110,650,210" href="/item/view/sek47fmq_n_b953gat641fkg5bj7hyg14rrxx4bw/" alt="Double Draped Diamonds by Zelia Horsley Jewellery" title="Double Draped Diamonds by Zelia Horsley Jewellery"    />
            </map>
        </div>
        <div id="bannerLeft" style="right: 23px; top: 12px; width: 360px;">

            <h2>Inspiring designers bringing you the uniquely beautiful</h2>
            <p>Shop Unseen and Exquisite Jewellery and Accessories
            Direct from designers around the globe<br />
            <a class="browseItems" href="/browse/earrings">Browse Items</a></p>
        </div>
        <div id="bannerRight" style="padding: 0; width: 420px; right: 20px; bottom: 10px;">
            <div id="newsletter">
                <h3 class="emailUpdates" style="font-size:1.46em;">Discover new designers and their latest pieces</h3>
                <form id="emailUpdatesForm" action="/index/newsletter/" method="post" style="width: 276px;">
                    <fieldset>
                        <label for="signup">Signup</label>
                        <input type="text" name="signup" id="signup" class="inputSignup" value="My email address is"  />
                        <input type="submit" value="Signup" class="signup"  />
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</div>
<div id="homeSubBannerWrapper">
    <div id="homeSubBanner">
        <ul>
            <li><a style="background-image: url(/media/img/footer_facebook.png)"target="_blank" href="http://facebook.com/BoticcaOfficial">Find us on Facebook</a></li>
            <li><a style="background-image: url(/media/img/footer_twitter.png)" target="_blank" href="http://twitter.com/boticca">Follow us on Twitter</a></li>
        </ul>
        <p>Are you an emerging designer? <a href="/signup/become-a-seller/">Apply to sell on Boticca today</a></p>
    </div>
</div>
<?php if ($featured) : ?>            
<h3 class="floatLeft paddingTop"><?=$t->get('featured_items')?></h3>
<?php //<p class="floatLeft"><a href="#" class="homeBack">Back</a> <a href="#" class="homeNext">Next</a></p>?>
    <div class="clear"></div>
<?=$featured?>
    <div class="divider hidden"></div>
<?php endif ?>
<?php if ($featured_seller) : ?>
<h3><?=$t->get('featured_designer')?> <a href="http://<?=$featured_seller->subdomain?>.<?=Site_Config::v('domain')?>/"><?=$featured_seller->name?></a></h3>

    <div id="homeDesignerLeft">
    <p class="floatLeft"><img width="101" height="101" src="<?=$featured_seller->avatar?>" alt="<?=$featured_seller->name?>" /></p>
<?=$featured_seller->profile?>
<p><a href="http://<?=$featured_seller->subdomain?>.<?=Site_Config::v('domain')?>/profile/"><?=$t->get('read_more')?></a></p>
    </div>

    <div id="homeDesignerRight">
<?=$featured_seller_products?>
    </div>

    <div class="divider hidden"></div>
<?php endif ?>
<?php if ($recent_thumbs) : ?>
<h3 class="floatLeft paddingTop"><?=$t->get('recent_additions')?></h3>
<?php //<p class="floatLeft"><a href="#" class="homeBack">Back</a> <a href="#" class="homeNext">Next</a></p> ?>
    <div class="clear"></div>
    <?=$recent_thumbs?>
    <div class="clear"></div>
<?php endif ?>