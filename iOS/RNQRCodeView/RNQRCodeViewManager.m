//
//  RNQRCodeViewManager.m
//  RNQRCodeView
//
//  Created by Kelsey Regan on 2015-11-25.
//  Copyright © 2015 Elevated Pixels. All rights reserved.
//

#import "RNQRCodeViewManager.h"

#import "RNQRCodeView.h"

@implementation RNQRCodeViewManager


@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

RCT_REMAP_VIEW_PROPERTY(qrData, NSArray, RNQRCodeView)
RCT_REMAP_VIEW_PROPERTY(foregroundColor, UIColor, RNQRCodeView)

@end
